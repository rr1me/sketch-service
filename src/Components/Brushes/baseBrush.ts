import { ITool, IToolType } from './itool';
import { updCoords } from './properties';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	// ctx.lineWidth = 15;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	// ctx.globalAlpha = 0.1

	let saved = canvas.toDataURL();

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);

		saved = canvas.toDataURL();
	};

	const mouseUp = () => defMouseUp('Brush', ctx, dispatch, canvas)

	const mouseMove = async (e: MouseEvent) => {
		ctx.lineTo(pos.x, pos.y);
		await shapeSaver(saved, ctx, canvas.height, canvas.width)
		ctx.stroke();
		// ctx.beginPath();
		// ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);
		// ctx.fill();
		// ctx.closePath();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;