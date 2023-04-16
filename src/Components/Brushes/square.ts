import { ITool, IToolType, Size } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const square = ({ canvas, pos, dispatch,ctx }: ITool): IToolType => {
	const startPos: IPos = {x:0, y:0};
	const size = {w: 0, h:0};
	let saved = canvas.toDataURL();

	const mouseDown = () => {
		startPos.x = pos.x
		startPos.y = pos.y

		saved = canvas.toDataURL();
	};

	const mouseUp = () => {
		defMouseUp('Square', ctx, dispatch, canvas);

		return {start: startPos, size};
	}

	const mouseMove = async () => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width)

		size.w = pos.x-startPos.x
		size.h = pos.y-startPos.y

		drawSquare(ctx, startPos, size);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default square;

export const drawSquare = (ctx: CanvasRenderingContext2D,start: IPos, size:Size) => {
	ctx.beginPath();
	ctx.rect(start.x, start.y, size.w, size.h);
	ctx.fill();
	ctx.closePath();
}