import { ITool, IToolType } from './itool';
import { defMouseUp, shapeSaver } from './toolOrchestrator';
import { Simulate } from 'react-dom/test-utils';
import loadedData = Simulate.loadedData;

const baseBrush = ({ canvas, pos, dispatch, ctx }: ITool): IToolType => {
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	let saved = canvas.toDataURL();

	let prev: any = null;







	const fx = 500;
	const sx = 600;

	const d = Math.sqrt(Math.pow(sx - fx, 2) + Math.pow(500 - 500, 2));


	const calcX = (fx: number, sx: number, fy:number, sy:number) => {
		const d = Math.sqrt(Math.pow(sx - fx, 2) + Math.pow(sy - fy, 2));
		return fx + (5 * (sx - fx) / d);
	}

	const calcY = (fx: number, sx: number, fy:number, sy:number) => {
		const d = Math.sqrt(Math.pow(sx - fx, 2) + Math.pow(sy - fy, 2));
		return fy + (5 * (sy - fy) / d);
	}

	// ctx.globalAlpha = 0.3;


	ctx.beginPath();
	ctx.arc(fx, 500, 25, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill()

	// ctx.beginPath();
	// ctx.arc(sx, 500, 25, 0, 2 * Math.PI);
	// ctx.closePath();
	// ctx.fill()


	const dotsBetween = d / 5;

	// let offset = calc(fx)

	// console.log(dotsBetween, calc(505));

	const asyncfunc = async () => {
		for (let i = 0; i < dotsBetween-1; i++){

			ctx.beginPath();
			// ctx.arc(offset, 500, 25, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill()

			// console.log(offset);
			// offset = calc(offset);

			// await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	// asyncfunc();

	// console.log(sx + (5 * (sx - fx) )/ d);
	// console.log(800 + (5 * (800 - 500) )/ d);






	const drawDot = (x:number,y:number) => {
		ctx.beginPath();
		ctx.arc(x, y, 25, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill()
	}












	const mouseDown = () => {
		// ctx.beginPath();
		// ctx.moveTo(pos.x, pos.y);

		// ctx.beginPath();
		// ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
		// ctx.closePath();
		// ctx.fill()

		saved = canvas.toDataURL();
		prev = {x: pos.x, y:pos.y};
	};

	const mouseUp = () => {
		defMouseUp('Brush', ctx, dispatch, canvas);
	};

	const mouseMove = async () => {
		const d = Math.sqrt(Math.pow(pos.x - prev.x, 2) + Math.pow(pos.y - prev.y, 2));
		const between = Math.floor(d / 5) - 1;

		if (d < 5) return;


		let x;
		let y;


		if (between > 0){
			let px = prev.x;
			let py = prev.y;

			for (let i = 0; i < between; i++){
				x = calcX(px, pos.x, py, pos.y);
				y = calcY(px, pos.x, py, pos.y);


				drawDot(x, y);

				px = x;
				py = y;
			}
		}else{
			x = calcX(prev.x, pos.x, prev.y, pos.y);
			y = calcY(prev.x, pos.x, prev.y, pos.y);
			drawDot(x, y);
		}





		prev = { x: x, y: y };
	};

	return [mouseDown, mouseMove, mouseUp];
};

export default baseBrush;