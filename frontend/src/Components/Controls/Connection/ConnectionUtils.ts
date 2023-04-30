import { actions, IToolParam } from '../../../redux/slices/controlSlice';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { bbMove, drawDot, getDist } from '../../Brushes/baseBrush';
import { Body, BrushBody, CircleBody, IRoom, LineBody, PeerData, RectangleBody, SquareBody } from './types';
import { drawSquare } from '../../Brushes/square';
import { drawCircle } from '../../Brushes/circle';
import { drawLine } from '../../Brushes/line';
import { drawRectangle } from '../../Brushes/rectangle';
import { notify } from '../../Notifications/NotificationManager';
import store from '../../../redux/store';
import { DataConnection } from 'peerjs';

let radius = 0;
let dist = 0;
let prev: { x: number, y: number } = { x: 0, y: 0 };

const networkDraw = async (body: Body & object, ctx: CanvasRenderingContext2D) => {
	const type = body.type;

	const prevFill = ctx.fillStyle;
	const prevGlobalAlpha = ctx.globalAlpha;

	ctx.fillStyle = body.params.color;
	ctx.globalAlpha = body.params.opacity;

	if (type === 'Brush') {
		const { condition, x, y, params } = body as BrushBody;

		const prevStroke = ctx.strokeStyle;

		ctx.strokeStyle = params.color;
		radius = params.width;
		dist = getDist(radius);

		if (condition === 'start') {

			drawDot(ctx, x, y, radius);
			prev = { x: x, y: y };
		} else if (condition === 'move') {
			bbMove(prev, { x, y }, ctx, radius, dist);
		}

		ctx.strokeStyle = prevStroke;
	} else if (type === 'Square') {
		const { start, size, params } = body as SquareBody;

		ctx.fillStyle = params.color;
		ctx.globalAlpha = params.opacity;

		drawSquare(ctx, start, size);
	} else if (type === 'Circle') {
		const { center, radius, params } = body as CircleBody;

		drawCircle(ctx, center, radius);
	} else if (type === 'Line') {
		const { start, end, params } = body as LineBody;
		const prevWidth = ctx.lineWidth;
		const prevCap = ctx.lineCap;
		const prevStroke = ctx.strokeStyle;

		ctx.lineWidth = params.width;
		ctx.lineCap = params.cap;
		ctx.strokeStyle = params.color;

		drawLine(ctx, start, end);
		ctx.lineWidth = prevWidth;
		ctx.lineCap = prevCap;
		ctx.strokeStyle = prevStroke;
	} else if (type === 'Rectangle') {
		const { first, second, third, params } = body as RectangleBody;

		drawRectangle(ctx, first, second, third);
	}

	ctx.fillStyle = prevFill;
	ctx.globalAlpha = prevGlobalAlpha;
};

export const dataEvent = (canvas: HTMLCanvasElement, tool: IToolParam, disconnect: () => void, dataConnection: DataConnection) => {
	const ctx = canvas.getContext('2d')!;

	return async (d: PeerData | any) => {
		const data = d as PeerData;

		switch (data.type) {
			case 'Canvas':
				await shapeSaver(data.body as string, ctx, canvas.height, canvas.width);
				break;
			case 'Drawing':
				await networkDraw(data.body as Body & object, ctx);
				break;
			case 'Kick':
				notify('You\'ve been kicked', '#ff0000');
				disconnect();
				break;
			case 'Clear':
				ctx.clearRect(0, 0, 1920, 1080);
				notify(getUser(dataConnection.peer).name + ' cleaned the canvas')
				break;
		}
	};
};

export const getUser = (peerId: string) => {
	const room = store.getState().connectionSlice.room as IRoom;
	return room.users.find(x => x.peerId === peerId)!;
};

export const clearHistory = () => store.dispatch(actions.clear());