import { IToolParam } from '../../../redux/slices/controlSlice';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { DataConnection } from 'peerjs';
import { bbMove, drawDot, getDist } from '../../Brushes/baseBrush';

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

export const updateEvents = (canvas: HTMLCanvasElement, tool: IToolParam, connections: DataConnection[]) => {
	const event = dataEvent(canvas, tool);

	connections.forEach(v => v.off('data'));
	connections.forEach(v => v.on('data', event));
};

export const dataEvent = (canvas: HTMLCanvasElement, tool: IToolParam) => {
	const ctx = canvas.getContext('2d')!;

	const restore = () => {
		const ctx = canvas.getContext('2d')!;
		ctx.strokeStyle = tool.color;
		ctx.fillStyle = tool.color;
		ctx.globalAlpha = tool.opacity;
	};

	return async (data: any) => {
		if (typeof data == 'string') {
			await shapeSaver(data, ctx, canvas.height, canvas.width);
			return;
		}

		await networkDraw(data, ctx, canvas, restore);
	};
}