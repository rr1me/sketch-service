import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IControlState } from '../../redux/slices/controlSlice';
import toolOrchestrator from '../Brushes/toolOrchestrator';
import { Socket } from 'socket.io-client';
import { connType } from '../../App';

interface IUseControlledCanvas {
	canvas: RefObject<HTMLCanvasElement>,
	controlledCanvas: JSX.Element
}

export interface IPos {
	x: number,
	y: number
}

const pos: IPos = { x: 0, y: 0 };
const fixRatio = 50;
const res = [
	(window.outerHeight - 71) - fixRatio,
	window.outerWidth - fixRatio,
];

const useControlledCanvas = (connection: connType): IUseControlledCanvas => {
	const dispatch = useDispatch();
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const params = useSelector((state: any) => { // am I really want to assign type for this callback? x_x
		const type = tool.type;
		switch (type) {
		case 'Brush':
			return state.baseBrushSlice;
		case 'Square':
			return state.squareSlice;
		case 'Line':
			return state.lineSlice;
		default:
			return state.baseBrushSlice;
		}
	});

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			const [mouseDown, mouseMove, mouseUp] = toolOrchestrator(tool, params, canvas.current, pos, dispatch, connection);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);
			};
		}
	}, [tool, params]);

	return {
		canvas: canvas, controlledCanvas: (
			<>
				{/* <button onClick={makeHandle}>make</button> */}
				{/* <button onClick={connHandle}>conn</button> */}
				{/* <button onClick={sendHandle}>send</button> */}
				{/* <input ref={inputpeer}/> */}
				<canvas ref={canvas}
						height={1080} width={1920}
						style={{ height: res[0], width: res[1] }}
						className={s.canvas}
				/>
			</>
		),
	};
};

export default useControlledCanvas;