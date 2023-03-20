import { ITool, IToolType } from './itool';
import { defMouseUp } from './toolOrchestrator';
import { actions } from '../../redux/slices/controlSlice';

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	let prev: { x: number, y: number } = { x: 0, y: 0};

	const radius = ctx.lineWidth;
	const dist = getDist(radius);
	console.log(dist);

	const mouseDown = () => {
		drawDot(ctx, pos.x, pos.y, radius)
		prev = { x: pos.x, y: pos.y };
	};
	const mouseUp = () => {
		const items = canvas.toDataURL();

		dispatch(actions.save({ type: 'Brush', save: items }));
	}
	const mouseMove = async () => bbMove(prev, pos, ctx, radius, dist)

	return [mouseDown, mouseMove, mouseUp];
};

export const getDist = (radius: number) => {
	const radiusPercent = 100 / (49 / (radius - 1));

	return (9 / 100 * radiusPercent) + 1;
}

export const bbMove = (prev: any, pos: any, ctx: any, radius: number, dist: number) => {
	const d = hypotenuse(prev.x, pos.x, prev.y, pos.y);
	if (d < dist) return;
	const between = Math.floor(d / dist) - 1;

	let x = 0;
	let y = 0;

	if (between > 0) {
		let px = prev.x;
		let py = prev.y;

		for (let i = 0; i < between; i++) {
			x = calcX(px, pos.x, py, pos.y, dist);
			y = calcY(px, pos.x, py, pos.y, dist);

			drawDot(ctx, x, y, radius);

			px = x;
			py = y;
		}
	} else {
		x = calcX(prev.x, pos.x, prev.y, pos.y, dist);
		y = calcY(prev.x, pos.x, prev.y, pos.y, dist);
		drawDot(ctx, x, y, radius);
	}

	prev.x = x;
	prev.y = y;
}

const hypotenuse = (fx: number, sx: number, fy: number, sy: number) => Math.sqrt(Math.pow(sx - fx, 2) + Math.pow(sy - fy, 2))

const calcX = (fx: number, sx: number, fy: number, sy: number, dist: number) => {
	const d = hypotenuse(fx, sx, fy, sy);
	return fx + (dist * (sx - fx) / d);
};

const calcY = (fx: number, sx: number, fy: number, sy: number, dist: number) => {
	const d = hypotenuse(fx, sx, fy, sy);
	return fy + (dist * (sy - fy) / d);
};

export const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
};

export default baseBrush;