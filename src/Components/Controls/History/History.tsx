import s from './History.module.scss';
import ic from '../../Icons/Icons';
import React, { FC, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, IControlState } from '../../../redux/slices/controlSlice';
import MovingBlock from '../MovingBlock/MovingBlock';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import SimpleBar from 'simplebar-react';

interface IHistory {
	canvas: RefObject<HTMLCanvasElement>
}

const { move, step, clear } = actions;

const History: FC<IHistory> = ({ canvas }) => {
	const ctx: CanvasRenderingContext2D = canvas.current?.getContext('2d') as CanvasRenderingContext2D;
	const width = canvas.current?.width as number;
	const height = canvas.current?.height as number;

	const dispatch = useDispatch();
	const {
		history: { saves, index },
	} = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const draw = async (index: number) =>
		await shapeSaver(saves[index].save, ctx, canvas.current!.height, canvas.current!.width);

	const redraw = async (direction: boolean) => {
		const d = direction ? 1 : -1;
		await draw(index - d);
		dispatch(step(d));
	};

	const undoHandler = () => index > 0 && redraw(true);
	const redoHandler = () => saves.length - 1 > index && redraw(false);
	const clearHandler = () => {
		dispatch(clear());
		ctx.clearRect(0, 0, width, height);
	};

	const historyHandler = (i: number) => async () => {
		await draw(i);
		dispatch(move(i));
	};

	return (
		<MovingBlock name={ic.history} side={'left'} outsideOffset={120} gap={20} locationOffsetSide={'top'} locationOffset={20}>
			<div className={s.history}>
				<div className={s.historyCtrl}>
					<span>History</span>
					<button className={s.iconButton} onClick={undoHandler}>{ic.arrowBack}</button>
					<button className={s.iconButton} onClick={redoHandler}>{ic.arrowForward}</button>
					<button className={s.iconButton} onClick={clearHandler}>{ic.clean}</button>
				</div>
				<SimpleBar style={{maxHeight: 300}} className={s.bar} forceVisible={'y'} autoHide={false}>
					<div className={s.historyList}>
						{saves.length > 0 && saves.map((v, i) => {
							return (
								<button key={i} onClick={historyHandler(i)}
										className={s.historyButton + (i > index ? ' ' + s.historyButtonDark : '')}>
									<span>{v.type}</span>
									<span>{i}</span>
								</button>
							);
						})}
					</div>
				</SimpleBar>
			</div>
		</MovingBlock>
	);
};

export default History;