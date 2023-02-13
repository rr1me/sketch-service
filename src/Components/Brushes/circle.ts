import { ITool, IToolType } from './itool';
import { IPos } from '../MainFrame/useControlledCanvas';
import { updCoords } from './properties';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const circle = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {

	const startPos: IPos = {x:0, y:0};
	let saved = canvas.toDataURL();

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		startPos.x = pos.x
		startPos.y = pos.y

		saved = canvas.toDataURL();
	};

	const mouseUp = () => defMouseUp('Circle', ctx, dispatch, canvas)

	const mouseMove = async (e: MouseEvent) => {
		await shapeSaver(saved, ctx, canvas.height, canvas.width)

		const centerX = (pos.x + startPos.x)/2
		const centerY = (pos.y + startPos.y)/2

		const radius = Math.sqrt(Math.pow(Math.abs(startPos.x - pos.x), 2) + Math.pow(Math.abs(startPos.y - pos.y), 2))/2

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.fill();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default circle;