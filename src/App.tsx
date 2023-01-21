import React, { useEffect, useRef, useState } from 'react';
import s from './App.module.scss';

function App() {
	const canvas = useRef<HTMLCanvasElement>(null);

	let ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

	// if (canvas.current) ctx = canvas.current.getContext('2d')!;

	useEffect((): void => {
		if (canvas.current) {
			console.log('lol');
			ctx = canvas.current.getContext('2d')!;
			// ctx.getContextAttributes().willReadFrequently = true;
			// ctx.getImageData(fixRatio, fixRatio, res[1], res[0])
			// ctx.getImageData(fixRatio, fixRatio, res[1], res[0])
		}
		// console.log(window.innerHeight, window.innerWidth);
		// console.log(window.screen.height, window.screen.width);
		// console.log(window.screen);
	}, [ctx]);

	// useEffect(() => {
	// 	console.log('rerender');
	// })

	const pos = { x: 0, y: 0 };

	const fixRatio = 40;

	const res = [
		window.innerHeight - fixRatio,
		window.innerWidth - fixRatio,
	];

	const setPosition = (e: React.MouseEvent) => {
		if (!canvas.current) return;
		const c = 20;
		pos.x = e.clientX - c;
		pos.y = e.clientY - c;
	};

	const draw = (e: React.MouseEvent) => {
		// console.log(ctx);
		if (e.buttons !== 1 || !ctx) return;

		ctx.beginPath();

		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#ff8500';

		ctx.moveTo(pos.x, pos.y);
		setPosition(e);
		ctx.lineTo(pos.x, pos.y);

		ctx.stroke();
	};


	const clearHandler = () => {
		ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
	};

	const [old, setOld] = useState<string>('');

	const setHandler = async () => {
		// ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D;
		// ctx.getImageData(fixRatio, fixRatio, res[1], res[0])
		if (canvas.current) {
			const x = canvas.current.toDataURL();
			// await timeout(10)
			setOld(x);
			// console.log(ctx, canvas.current);
			// const img = new Image();
			// img.src = old;
			// ctx.drawImage(img, fixRatio, fixRatio);
			// ctx = canvas.current.getContext('2d', { willReadFrequently: true })!;
			// ctx = canvas.current?.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
		}
		// ctx.putImageData(x, fixRatio, fixRatio)
		// ctx = newCtx;
	};

	// function timeout(delay: number) {
	// 	return new Promise( res => setTimeout(res, delay) );
	// }

	const useHandler = async () => {
		console.log('use');
		// ctx.putImageData(old, fixRatio, fixRatio);
		const img = new Image();
		img.src = old;
		// for (let a = 0; a < 16; a++){
		// 	console.log('fir');
		// 	// await setTimeout(() => {
		// 	// 	// console.log('time');
		// 	// 	// ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
		// 	// 	// ctx.drawImage(img, 0, 0);
		// 	// }, 1000)
		// 	// await timeout(1000)
		// 	// console.log('time');
		// 	ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
		// 	await timeout(500)
		// 	ctx.drawImage(img, 0, 0);
		// 	console.log('draw');
		// 	await timeout(500)
		// }

		ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
		await new Promise( res => setTimeout(res, 0) )
		ctx.drawImage(img, 0, 0);

	};

	const ctxHandler = () => {
		ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D;
	};

	return (
		<div className={s.app} style={{ height: res[0], width: res[1] }}>
			<div className={s.buttons}>
				<button onClick={clearHandler}>clear</button>
				<button onClick={setHandler}>set</button>
				<button onClick={useHandler}>user</button>
				<button onClick={ctxHandler}>ctx</button>
			</div>

			<canvas ref={canvas}
					height={res[0]} width={res[1]}
					className={s.canvas}
					onMouseMoveCapture={draw}
					onMouseDown={setPosition} onMouseEnter={setPosition} />
		</div>
	);
}

export default App;
