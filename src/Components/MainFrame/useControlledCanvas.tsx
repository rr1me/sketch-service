import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IControlState } from '../../redux/slices/controlSlice';
import toolOrchestrator from '../Brushes/toolOrchestrator';
import baseBrush from '../Brushes/baseBrush';
import square from '../Brushes/square';
import circle from '../Brushes/circle';
import line from '../Brushes/line';
import rectangle from '../Brushes/rectangle';
import fill from '../Brushes/fill';

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

const useControlledCanvas = (): IUseControlledCanvas => {
	const dispatch = useDispatch();
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const params = useSelector((state: any) => {
		const type = tool.type;
		switch (type) {
		case 'Brush':
			return state.baseBrushSlice;
		default:
			return state.baseBrushSlice;
		}
	})

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			const [mouseDown, mouseMove, mouseUp] = toolOrchestrator(tool, params, canvas.current, pos, dispatch);
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
			<canvas ref={canvas}
					height={1080} width={1920}
					style={{height: res[0], width: res[1]}}
					className={s.canvas}
			/>
		),
	};
};

export default useControlledCanvas;