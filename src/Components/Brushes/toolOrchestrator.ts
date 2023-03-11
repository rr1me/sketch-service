import { actions, brushType, IToolParam } from '../../redux/slices/controlSlice';
import { AppDispatch } from '../../redux/store';
import baseBrush from './baseBrush';
import square from './square';
import circle from './circle';
import line from './line';
import rectangle from './rectangle';
import fill from './fill';
import { IPos } from '../MainFrame/useControlledCanvas';
import { updCoords } from './properties';
import { IParamObject } from '../../redux/slices/INumberParam';
import { ILineSlice, tLineCap } from '../../redux/slices/lineSlice';
import { connType } from '../../App';

const toolOrchestrator = (tool: IToolParam, params: IParamObject, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch, connection: connType) => {
	const ctx = canvas.getContext('2d')!;

	ctx.strokeStyle = tool.color;
	ctx.fillStyle = tool.color;

	let pressed = false;

	let previous: {x: number, y: number};

	let lastPoint: {x: number, y:number} | undefined;

	const [mouseDown, mouseMove, mouseUp] = getTool(tool, params, canvas, pos, dispatch, ctx);

	const outMouseDown = (e: MouseEvent) => {
		updCoords(e, pos, canvas);
		pressed = true;
		console.log(connection);

		previous = {x: pos.x, y: pos.y};

		// mouseDown(e);
		connection.conn?.send({ type: 'start', x: e.clientX, y: e.clientY });
	};
	const outMouseMove = async (e: MouseEvent) => {





		if (e.buttons !== 1 || !pressed) return;

		if (!lastPoint) {
			lastPoint = { x: e.offsetX, y: e.offsetY };
			return;
		}
		ctx.beginPath();
		ctx.moveTo(lastPoint.x, lastPoint.y);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = 'green';
		// ctx.lineWidth = Math.pow(currentForce, 4) * 2;
		ctx.lineCap = 'round';
		ctx.stroke();
		lastPoint = { x: e.offsetX, y: e.offsetY };
		// ctx.closePath();

		connection.conn?.send({ type: 'move', x: e.clientX, y: e.clientY });


		// updCoords(e, pos, canvas);
		//
		// const distance = Math.sqrt(Math.pow(pos.x - previous.x, 2) + Math.pow(pos.y - previous.y, 2));
		// if (distance < 5) return;
		// previous = {x: pos.x, y: pos.y};
		//
		// mouseMove(e);
	};
	const outMouseUp = (e: MouseEvent) => {
		if (!pressed) return;
		pressed = false;

		lastPoint = undefined;
		ctx.closePath();

		// mouseUp(e);
		connection.conn?.send({ type: 'end', x: e.clientX, y: e.clientY });
	};

	return [outMouseDown, outMouseMove, outMouseUp];
};

const getTool = (tool: IToolParam, params: IParamObject, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch, ctx: CanvasRenderingContext2D) => {
	ctx.globalAlpha = tool.opacity;
	const type = tool.type;
	switch (type) {
	case 'Brush':
		ctx.lineWidth = params.width.v;
		return baseBrush({ canvas, pos, dispatch, ctx });
	case 'Square':
		return square({ canvas, pos, dispatch, ctx });
	case 'Circle':
		return circle({ canvas, pos, dispatch, ctx });
	case 'Line':
		ctx.lineWidth = params.width.v;
		ctx.lineCap = lineCapOptions[(params as ILineSlice).lineCap].value;
		return line({ canvas, pos, dispatch, ctx });
	case 'Rectangle':
		return rectangle({ canvas, pos, dispatch, ctx });
	case 'Fill':
		return fill({ canvas, pos, dispatch, ctx });
	default:
		return baseBrush({ canvas, pos, dispatch, ctx });
	}
};

export const defMouseUp = (type: brushType, ctx: CanvasRenderingContext2D, dispatch: AppDispatch, canvas: HTMLCanvasElement) => {
	ctx.closePath();
	const items = canvas.toDataURL();

	dispatch(actions.save({ type: type, save: items }));
};

export const shapeSaver = async (saved: string, ctx: CanvasRenderingContext2D, height: number, width: number) => {
	const img = new Image();
	img.src = saved;
	await img.onload;

	const oldGA = ctx.globalAlpha;

	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, 0, 0, width, height);
	ctx.globalAlpha = oldGA;
};

export const lineCapOptions = [
	{ value: 'butt', label: 'Butt' },
	{ value: 'round', label: 'Round' },
	{ value: 'square', label: 'Square' },
] as { value: tLineCap, label: string }[];

export default toolOrchestrator;