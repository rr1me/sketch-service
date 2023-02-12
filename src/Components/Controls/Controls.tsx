import s from './Controls.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions, brushType, IControlState } from '../../redux/slices/controlSlice';
import React, { FC, RefObject } from 'react';
import { RiArrowGoBackFill, RiArrowGoForwardFill, RiPaintFill } from 'react-icons/ri';
import { GiVacuumCleaner } from 'react-icons/gi';
import { FaPaintBrush } from 'react-icons/fa';
import { IoMdSquare } from 'react-icons/io';
import { BsCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { HiOutlineMinus } from 'react-icons/hi';

interface IControls {
	canvas: RefObject<HTMLCanvasElement>
}

const {move, step, clear, tool} = actions;

const Controls: FC<IControls> = ({canvas}) => {
	const ctx: CanvasRenderingContext2D = canvas.current?.getContext('2d') as CanvasRenderingContext2D;
	const width = canvas.current?.width as number;
	const height = canvas.current?.height as number
	const dispatch = useDispatch();
	const {history: {saves, index}} = useSelector((state: {controlSlice: IControlState}) => state.controlSlice);

	const draw = async (index:number) => {
		const img = new Image();

		img.src = saves[index].save;
		await img.onload;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(img, 0, 0);
	}

	const redraw = async (direction:boolean) => {
		const d = direction ? 1 : -1;
		await draw(index-d)
		dispatch(step(d));
	}

	const clearHandler = () => {
		dispatch(clear());
		ctx.clearRect(0, 0, width, height);
	};

	const undoHandler = () => index > 0 && redraw(true);
	const redoHandler = () => saves.length-1 > index && redraw(false);

	const historyHandler = (i:number) => async () => {
		await draw(i);
		dispatch(move(i));
	}

	const selectTool = (type: brushType) => () => {
		dispatch(tool(type));
	}

	return (
		<div className={s.controls}>
			<div className={s.tools}>
				<button className={s.iconButton} onClick={selectTool('Brush')}><FaPaintBrush/></button>
				<button className={s.iconButton} onClick={selectTool('Square')}><IoMdSquare/></button>
				<button className={s.iconButton} onClick={selectTool('Circle')}><BsCircleFill/></button>
				<button className={s.iconButton} onClick={selectTool('Line')}><HiOutlineMinus/></button>
				<button className={s.iconButton} onClick={selectTool('Rectangle')}><BsFillTriangleFill/></button>
				<button className={s.iconButton} onClick={selectTool('Fill')}><RiPaintFill/></button>
			</div>

			<div className={s.history}>
				<div className={s.historyCtrl}>
					<span>History</span>
					<button className={s.iconButton} onClick={undoHandler}><RiArrowGoBackFill/></button>
					<button className={s.iconButton} onClick={redoHandler}><RiArrowGoForwardFill/></button>
					<button className={s.iconButton} onClick={clearHandler}><GiVacuumCleaner/></button>
				</div>

				{saves.length > 0 && saves.map((v,i) => {
					return (
						<button key={i} onClick={historyHandler(i)} className={s.historyButton + ' ' + (i > index ? s.historyButtonDark : null)}>
							<span>{v.type}</span>
							<span>{i}</span>
						</button>
					)
				})}
			</div>
		</div>
	);
};

export default Controls;