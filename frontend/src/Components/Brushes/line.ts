import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const line = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	const startPos: IPos = { x: 0, y: 0 };
	let saved = canvas.toDataURL();

	const mouseDown = () => {
		startPos.x = pos.x;
		startPos.y = pos.y;

		saved = canvas.toDataURL();
	};

	const mouseUp = () => {
		defMouseUp('Line', ctx, dispatch, canvas);

		return { start: startPos, end: pos };
	};

	const mouseMove = async () => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width);

		drawLine(ctx, startPos, pos);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default line;

export const drawLine = (ctx: CanvasRenderingContext2D, start: IPos, end: IPos) => {
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
	ctx.closePath()
}