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

const toolOrchestrator = (tool: IToolParam, params: IParamObject, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch) => {
	const ctx = canvas.getContext('2d')!;

	ctx.strokeStyle = tool.color;
	ctx.fillStyle = tool.color;

	let pressed = false;

	const [mouseDown, mouseMove, mouseUp] = getTool(tool, params, canvas, pos, dispatch, ctx);

	const outMouseDown = (e: MouseEvent) => {
		updCoords(e, pos, canvas);
		pressed = true;
		mouseDown(e);
	}
	const outMouseMove = async (e: MouseEvent) => {
		if (e.buttons !== 1 || !pressed) return;
		mouseMove(e);
		updCoords(e, pos, canvas);
	};
	const outMouseUp = (e: MouseEvent) => {
		if (!pressed) return;
		pressed = false;
		mouseUp(e);
	}

	return [outMouseDown, outMouseMove, outMouseUp];
};

const getTool = (tool: IToolParam, params: IParamObject, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch, ctx: CanvasRenderingContext2D) => {
	const type = tool.type;
	switch (type) {
	case 'Brush':
		ctx.lineWidth = params.width.v;
		ctx.globalAlpha = params.opacity.v;
		return baseBrush({ canvas, pos, dispatch, ctx });
	case 'Square':
		return square({ canvas, pos, dispatch, ctx });
	case 'Circle':
		return circle({ canvas, pos, dispatch, ctx });
	case 'Line':
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

	ctx.globalAlpha = 1
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, 0, 0, width, height);
	ctx.globalAlpha = oldGA;
};

export default toolOrchestrator;