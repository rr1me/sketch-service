import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import baseBrush from '../Brushes/baseBrush';
import { AppDispatch } from '../../redux/store';
import { brushType, IControlState } from '../../redux/slices/controlSlice';
import square from '../Brushes/square';

interface IUseControlledCanvas {
	canvas: RefObject<HTMLCanvasElement>,
	controlledCanvas: JSX.Element
}

export interface IPos {
	x: number,
	y: number
}

const pos: IPos = { x: 0, y: 0 };
const fixRatio = 40;
const res = [
	(window.outerHeight - 71) - fixRatio,
	window.outerWidth - fixRatio,
];

const useControlledCanvas = (): IUseControlledCanvas => {
	const dispatch = useDispatch();
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			const [mouseDown, mouseMove, mouseUp] = getTool(tool.type, canvas.current, pos, dispatch);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);
			};
		}
	}, [tool.type]);

	return {
		canvas: canvas, controlledCanvas: (
			<canvas ref={canvas}
					height={res[0]} width={res[1]}
					className={s.canvas}
			/>
		),
	};
};

const getTool = (type: brushType, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch) => {
	switch (type) {
	case 'Brush':
		return baseBrush({ canvas, pos, dispatch });
	case 'Square':
		return square({ canvas, pos, dispatch });;
	default:
		return baseBrush({ canvas, pos, dispatch });
	}
};

export default useControlledCanvas;