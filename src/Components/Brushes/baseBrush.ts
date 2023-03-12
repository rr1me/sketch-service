import { ITool, IToolType } from './itool';
import { defMouseUp, shapeSaver } from './toolOrchestrator';

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	let saved = canvas.toDataURL();

	const mouseDown = () => {
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);

		saved = canvas.toDataURL();
	};

	const mouseUp = () => {
		defMouseUp('Brush', ctx, dispatch, canvas);
	}

	const mouseMove = async () => {
		ctx.lineTo(pos.x, pos.y);

		await shapeSaver(saved, ctx, canvas.height, canvas.width)
		ctx.stroke();
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;