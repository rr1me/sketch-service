import { ITool, IToolType } from './itool';
import { updCoords } from './properties';
import { IPos } from '../MainFrame/useControlledCanvas';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const square = ({ canvas, pos, dispatch,ctx }: ITool): IToolType => {

	const startPos: IPos = {x:0, y:0};
	let saved = canvas.toDataURL();

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		startPos.x = pos.x
		startPos.y = pos.y

		saved = canvas.toDataURL();
	};

	const mouseUp = () => defMouseUp('Square', ctx, dispatch, canvas)

	const mouseMove = async (e: MouseEvent) => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width)

		ctx.beginPath();
		ctx.rect(startPos.x, startPos.y, pos.x-startPos.x, pos.y-startPos.y);
		ctx.fill();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default square;