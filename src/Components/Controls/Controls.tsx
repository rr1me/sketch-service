import s from './Controls.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions, IControlState } from '../../redux/slices/controlSlice';
import { FC } from 'react';

interface IControls {
	canvas: any
}

const {move, step, clear} = actions;

const Controls: FC<IControls> = ({canvas}) => {
	const ctx: CanvasRenderingContext2D = canvas.current?.getContext('2d');
	const width = canvas.current?.width as number;
	const height = canvas.current?.height as number
	const dispatch = useDispatch();
	const {history: {saves, index}} = useSelector((state: {controlSlice: IControlState}) => state.controlSlice);

	const draw = async (index:number) => {
		const img = new Image();

		img.src = saves[index];
		await img.onload;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(img, 0, 0);
	}

	const redraw = async (direction:boolean) => {
		const d = direction ? 1 : -1;
		await draw(index-d)
		// setIndex(v=>v-d);
		dispatch(step(d));
	}

	const clearHandler = () => {
		dispatch(clear());
		console.log(ctx);
		ctx.clearRect(0, 0, width, height);
	};

	const undoHandler = () => index > 0 && redraw(true);
	const redoHandler = () => saves.length-1 > index && redraw(false);

	const historyHandler = (i:number) => async () => {
		await draw(i);
		dispatch(move(i));
	}

	return (
		<div className={s.controls}>
			<div className={s.tools}>
				<button onClick={clearHandler}>clear</button>
				<button onClick={undoHandler}>undo</button>
				<button onClick={redoHandler}>redo</button>
			</div>

			<div className={s.history}>
				History
				{saves.length > 0 && saves.map((v,i) => {
					return (
						<button key={i} onClick={historyHandler(i)} className={i > index ? s.darkBtn : undefined}>
							{i}
						</button>
					)
				})}
			</div>
		</div>
	);
};

export default Controls;