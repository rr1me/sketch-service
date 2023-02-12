import { ITool, IToolType } from './itool';
import { updCoords } from './properties';
import { actions } from '../../redux/slices/controlSlice';

const { save } = actions;

const square = ({ canvas, pos, dispatch }: ITool): IToolType => {
	const ctx = canvas.getContext('2d')!;
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ff8500'
	ctx.lineCap = 'square';
	ctx.lineJoin = 'round';

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
	};

	const mouseUp = () => {
		ctx.closePath();
		const items = canvas.toDataURL();

		dispatch(save({type: 'Square', save: items}));
	};

	const mouseMove = (e: MouseEvent) => {
		if (e.buttons !== 1) return;

		ctx.lineTo(pos.x, pos.y);
		ctx.stroke();
		updCoords(e, pos);
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default square;