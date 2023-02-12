import { actions } from '../../redux/slices/controlSlice';
import { ITool, IToolType } from './itool';
import { updCoords } from './properties';

const { save } = actions;

const baseBrush = ({ canvas, pos, dispatch }: ITool): IToolType => {
	const ctx = canvas.getContext('2d')!;
	ctx.lineWidth = 15;
	ctx.strokeStyle = 'black';
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
	};

	const mouseUp = () => {
		ctx.closePath();
		const items = canvas.toDataURL();

		dispatch(save({type: 'Brush', save: items}));
	};

	const mouseMove = (e: MouseEvent) => {
		if (e.buttons !== 1) return;

		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
		updCoords(e, pos);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;