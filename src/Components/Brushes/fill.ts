import { actions } from '../../redux/slices/controlSlice';
import { ITool, IToolType } from './itool';

const { save } = actions;

const fill = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {

	const mouseDown = (e: MouseEvent) => {
		ctx.beginPath();

		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill()
		ctx.closePath()

		const items = canvas.toDataURL();

		dispatch(save({type: 'Fill', save: items}));
	};

	const mouseUp = () => {};

	const mouseMove = () => {};

	return [mouseDown, mouseMove, mouseUp];
};

export default fill;