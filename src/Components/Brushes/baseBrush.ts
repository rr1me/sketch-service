import { ITool, IToolType } from './itool';
import { updCoords } from './properties';
import { defMouseUp } from './toolOrchestrator';

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	// ctx.lineWidth = 15;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
	};

	const mouseUp = () => defMouseUp('Brush', ctx, dispatch, canvas)

	const mouseMove = (e: MouseEvent) => {
		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;