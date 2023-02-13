import { actions } from '../../redux/slices/controlSlice';
import { ITool, IToolType } from './itool';
import { updCoords } from './properties';

const { save } = actions;

const fill = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {

	const mouseDown = (e: MouseEvent) => {
		updCoords(e, pos);
		ctx.beginPath();

		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill()
		ctx.closePath()

		const items = canvas.toDataURL();

		dispatch(save({type: 'Fill', save: items}));
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const mouseUp = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const mouseMove = (e: MouseEvent) => {};

	return [mouseDown, mouseMove, mouseUp];
};

export default fill;