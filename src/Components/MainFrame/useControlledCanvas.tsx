import s from './ControlledCanvas.module.scss';
import React, { FC, useEffect, useRef } from 'react';
import { actions, IControlState } from '../../redux/slices/controlSlice';
import { useDispatch, useSelector } from 'react-redux';

// interface IUseControlledCanvas {
// 	canvas: HTMLCanvasElement,
// 	controlledCanvas: object
//
// }

const { save } = actions;

const useControlledCanvas: any = () => {
	const dispatch = useDispatch();
	const { history } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const canvas = useRef<HTMLCanvasElement>(null);

	let ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
	useEffect((): void => {
		if (canvas.current)
			ctx = canvas.current.getContext('2d')!;
	}, [ctx]);

	const pos = { x: 0, y: 0 };

	const fixRatio = 40;

	const res = [
		(window.outerHeight - 71) - fixRatio,
		window.outerWidth - fixRatio,
	];

	const pressed = useRef(false);

	const mouseDown = (e: React.MouseEvent) => {
		if (!canvas.current) return;

		const c = 20;
		pos.x = e.clientX - c;
		pos.y = e.clientY - c;

		if (!pressed.current) {
			pressed.current = true;
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 5 / 2, 0, 2 * Math.PI, true);
			ctx.fillStyle = '#ff8500';
			ctx.fill();
		}
	};

	const mouseUp = () => {
		pressed.current = false;
		const items = canvas.current?.toDataURL();
		console.log('SAVE');
		dispatch(save(items));
	};

	const mouseMove = (e: React.MouseEvent) => {
		if (e.buttons !== 1 || !ctx) return;

		ctx.beginPath();

		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#ff8500';

		ctx.moveTo(pos.x, pos.y);
		mouseDown(e);
		ctx.lineTo(pos.x, pos.y);

		ctx.stroke();
	};
	console.log(history);

	return {
		canvas: canvas, controlledCanvas: (
			<canvas ref={canvas}
					height={res[0]} width={res[1]}
					className={s.canvas}
					onMouseMoveCapture={mouseMove}
					onMouseDown={mouseDown}
					onMouseUp={mouseUp}
			/>
		),
	};
};

export default useControlledCanvas;