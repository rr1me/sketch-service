import { IToolParam } from '../../../redux/slices/controlSlice';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { DataConnection } from 'peerjs';
import { bbMove, drawDot, getDist } from '../../Brushes/baseBrush';
import { PeerData } from './types';
import { ConnectionContext } from './ConnectionProvider';
import { useContext } from 'react';

let radius = 0;
let dist = 0;
let prev: { x: number, y: number } = { x: 0, y: 0 };

const networkDraw = async (data: any, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, restore: () => void) => {
	const { condition, x, y, params } = data;

	switch (condition) {
	case 'start':
		ctx.strokeStyle = params.color;
		ctx.fillStyle = params.color;
		radius = params.width;
		dist = getDist(radius);
		ctx.globalAlpha = params.opacity;

		drawDot(ctx, x, y, radius);
		prev = { x: x, y: y };
		break;
	case 'move':
		bbMove(prev, { x, y }, ctx, radius, dist);
		break;
	case 'end':
		restore();
	}
};

export const updateEvents = (canvas: HTMLCanvasElement, tool: IToolParam, connections: DataConnection[], disconnect: () => void) => {
	console.log(tool);
	const event = dataEvent(canvas, tool, disconnect);

	connections.forEach(v => v.off('data'));
	connections.forEach(v => v.on('data', event));
};

export const dataEvent =  (canvas: HTMLCanvasElement, tool: IToolParam, disconnect: () => void) => {
	const ctx = canvas.getContext('2d')!;

	const restore = () => {
		// console.log(tool);
		const ctx = canvas.getContext('2d')!;
		ctx.strokeStyle = tool.color;
		ctx.fillStyle = tool.color;
		ctx.globalAlpha = tool.opacity;
	};

	return async (data: PeerData | any) => {
		// if (data.type === 'Canvas') {
		// 	await shapeSaver(data, ctx, canvas.height, canvas.width);
		// 	return;
		// }
		//
		// await networkDraw(data, ctx, canvas, restore);

		switch (data.type) {
		case 'Canvas':
			await shapeSaver(data.data as string, ctx, canvas.height, canvas.width);
			break;
		case 'Drawing':
			await networkDraw(data.data, ctx, canvas, restore);
			break;
		case 'Kick':
			disconnect()
		}
	};
};