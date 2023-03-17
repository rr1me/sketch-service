import { ITool, IToolType } from './itool';
import { defMouseUp, shapeSaver } from './toolOrchestrator';
import { Simulate } from 'react-dom/test-utils';
import loadedData = Simulate.loadedData;
import { SlSocialGoogle } from 'react-icons/all';

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	// let saved = canvas.toDataURL();

	// let moved = false;

	let prev: any = null;

	const radius = ctx.lineWidth - 1;
	const radiusPercent = 100 / (49 / radius);

	const dist = (9 / 100 * radiusPercent) + 1;
	console.log(dist);

	const mouseDown = () => {
		// ctx.beginPath();

		// ctx.moveTo(pos.x, pos.y);
		// ctx.beginPath();
		// ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
		// ctx.closePath();

		// ctx.fill()
		// saved = canvas.toDataURL();
		drawDot(ctx, pos.x, pos.y, radius)
		prev = { x: pos.x, y: pos.y };

	};
	const mouseUp = () => {
		// if (!moved)
		// 	drawDot(ctx, pos.x, pos.y, radius)
		// else
		// 	moved = false;

		defMouseUp('Brush', ctx, dispatch, canvas);
	}

	const mouseMove = async () => {
		const d = Math.sqrt(Math.pow(pos.x - prev.x, 2) + Math.pow(pos.y - prev.y, 2));
		const between = Math.floor(d / dist) - 1;

		if (d < dist) return;
		// if (!moved) moved = true;

		let x;
		let y;

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

		prev = { x: x, y: y };
	};

	return [mouseDown, mouseMove, mouseUp];
};

const hypotenuse = (fx: number, sx: number, fy: number, sy: number) => Math.sqrt(Math.pow(sx - fx, 2) + Math.pow(sy - fy, 2))

const calcX = (fx: number, sx: number, fy: number, sy: number, dist: number) => {
	const d = hypotenuse(fx, sx, fy, sy);
	return fx + (dist * (sx - fx) / d);
};

const calcY = (fx: number, sx: number, fy: number, sy: number, dist: number) => {
	const d = hypotenuse(fx, sx, fy, sy);
	return fy + (dist * (sy - fy) / d);
};

const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
};

export default baseBrush;