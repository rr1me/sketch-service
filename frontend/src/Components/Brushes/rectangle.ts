import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const first = { x: 0, y: 0 };
const second = { x: 0, y: 0 };
const third = { x: 0, y: 0 };

const rectangle = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	const startPos: IPos = { x: 0, y: 0 };
	let saved = canvas.toDataURL();

	const mouseDown = () => {
		startPos.x = pos.x;
		startPos.y = pos.y;

		saved = canvas.toDataURL();
	};

	const mouseUp = () => {
		defMouseUp('Rectangle', ctx, dispatch, canvas);

		return {first, second, third}
	}

	const mouseMove = async () => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width);

		first.x = startPos.x;
		first.y = pos.y;

		second.x = Math.abs((startPos.x + pos.x) / 2);
		second.y = startPos.y;

		third.x = pos.x;
		third.y = pos.y;

		drawRectangle(ctx, first, second, third)
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default rectangle;

export const drawRectangle = (ctx: CanvasRenderingContext2D, first: IPos, second: IPos, third: IPos) => {
	ctx.beginPath();
	ctx.moveTo(first.x, first.y);
	ctx.lineTo(second.x, second.y);
	ctx.lineTo(third.x, third.y);
	ctx.fill();
}