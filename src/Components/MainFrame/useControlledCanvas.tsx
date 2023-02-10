import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import baseBrush from '../Brushes/baseBrush';
import { AppDispatch } from '../../redux/store';

interface IUseControlledCanvas {
	canvas: RefObject<HTMLCanvasElement>,
	controlledCanvas: JSX.Element
}
const pos = { x: 0, y: 0 };
const fixRatio = 40;
const res = [
	(window.outerHeight - 71) - fixRatio,
	window.outerWidth - fixRatio,
];

const useControlledCanvas = (): IUseControlledCanvas => {
	const dispatch = useDispatch();

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			// const mouseHandlers = getTool('Brush', canvas, pos, dispatch);
			const [mouseDown, mouseMove, mouseUp] = getTool('Brush', canvas, pos, dispatch);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);
			}
		}
	}, []);

	return {
		canvas: canvas, controlledCanvas: (
			<canvas ref={canvas}
					height={res[0]} width={res[1]}
					className={s.canvas}
			/>
		),
	};
};

const getTool = (type: string, canvas: RefObject<HTMLCanvasElement>, pos: {x:number, y:number}, dispatch: AppDispatch) => {
	switch (type) {
		case 'Brush': return baseBrush({ canvas, pos, dispatch });
		default: return baseBrush({ canvas, pos, dispatch });
	}
}

export default useControlledCanvas;