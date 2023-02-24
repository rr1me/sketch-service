import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const rectangle = ({ canvas, pos, dispatch,ctx }: ITool): IToolType => {
	// ctx.lineCap = 'square';
	// ctx.lineJoin = 'round';

	const startPos: IPos = {x:0, y:0};
	let saved = canvas.toDataURL();

	const mouseDown = (e: MouseEvent) => {
		startPos.x = pos.x
		startPos.y = pos.y

		saved = canvas.toDataURL();
	};

	const mouseUp = () => defMouseUp('Rectangle', ctx, dispatch, canvas)

	const mouseMove = async (e: MouseEvent) => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width)

		ctx.beginPath();
		ctx.moveTo(startPos.x, pos.y);
		ctx.lineTo(Math.abs((startPos.x+pos.x)/2), startPos.y);
		ctx.lineTo(pos.x, pos.y);
		ctx.fill();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default rectangle;