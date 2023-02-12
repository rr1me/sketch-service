import { actions, brushType } from '../../redux/slices/controlSlice';
import { AppDispatch } from '../../redux/store';
import baseBrush from './baseBrush';
import square from './square';
import circle from './circle';
import line from './line';
import rectangle from './rectangle';
import fill from './fill';
import { IPos } from '../MainFrame/useControlledCanvas';
import { updCoords } from './properties';

const toolOrchestrator = (type: brushType, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch) => {
	const ctx = canvas.getContext('2d')!;

	const [mouseDown, mouseMove, mouseUp] = getTool(type, canvas, pos, dispatch, ctx);

	const outMouseMove = async (e: MouseEvent) => {
		if (e.buttons !== 1) return;
		mouseMove(e);
		updCoords(e, pos);
	};
	return [mouseDown, outMouseMove, mouseUp];
};

const getTool = (type: brushType, canvas: HTMLCanvasElement, pos: IPos, dispatch: AppDispatch, ctx: CanvasRenderingContext2D) => {
	switch (type) {
	case 'Brush':
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
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, 0, 0, width, height);
};

export default toolOrchestrator;