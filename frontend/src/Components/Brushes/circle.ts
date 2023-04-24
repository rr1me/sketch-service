import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const circle = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	const startPos: IPos = { x: 0, y: 0 };
	const center: IPos = { x: 0, y: 0 };
	let radius = 0;
	let saved = canvas.toDataURL();

	const mouseDown = () => {
		startPos.x = pos.x;
		startPos.y = pos.y;

		saved = canvas.toDataURL();
	};

	const mouseUp = () => {
		defMouseUp('Circle', ctx, dispatch, canvas);

		return { center, radius };
	};

	const mouseMove = async () => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width);

		center.x = (pos.x + startPos.x) / 2;
		center.y = (pos.y + startPos.y) / 2;

		radius = Math.sqrt(Math.pow(Math.abs(startPos.x - pos.x), 2) + Math.pow(Math.abs(startPos.y - pos.y), 2)) / 2;

		drawCircle(ctx, center, radius);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default circle;

export const drawCircle = (ctx: CanvasRenderingContext2D,center: IPos, radius: number) => {
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
}