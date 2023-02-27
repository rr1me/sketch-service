import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const line = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	ctx.lineCap = 'round';
	// ctx.lineJoin = 'round';

	const startPos: IPos = {x:0, y:0};
	let saved = canvas.toDataURL();

	const mouseDown = (e: MouseEvent) => {
		startPos.x = pos.x
		startPos.y = pos.y

		saved = canvas.toDataURL();
	};

	const mouseUp = () => defMouseUp('Line', ctx, dispatch, canvas)

	const mouseMove = async (e: MouseEvent) => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width)

		ctx.beginPath();
		ctx.moveTo(startPos.x, startPos.y);
		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default line;