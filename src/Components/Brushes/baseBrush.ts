import React from 'react';
import { actions } from '../../redux/slices/controlSlice';
import { AppDispatch } from '../../redux/store';
import { ITool } from './itool';

const { save } = actions;

const baseBrush = ({ canvas, pos, dispatch }: ITool): (((e: MouseEvent) => void) | (() => void))[] => {
	const ctx = canvas.current!.getContext('2d')!;
	ctx.lineWidth = 15;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	const updCoord = (e: MouseEvent) => {
		const c = 20;
		pos.x = e.clientX - c;
		pos.y = e.clientY - c;
	};

	const mouseDown = (e: MouseEvent) => {
		if (!canvas.current) return;
		updCoord(e);
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
	};

	const mouseUp = () => {
		ctx.closePath();
		const items = canvas.current?.toDataURL();
		dispatch(save({type: 'Brush', save: items}));
	};

	const mouseMove = (e: MouseEvent) => {
		if (e.buttons !== 1 || !ctx) return;

		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
		updCoord(e);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;