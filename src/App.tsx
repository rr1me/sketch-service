import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
	const container = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);

	let ctx: CanvasRenderingContext2D;

	useEffect((): void => {
		if (canvas.current) {
			ctx = canvas.current.getContext('2d')!;
			// const resize = () => {
			// 	ctx.canvas.width = window.innerWidth;
			// 	ctx.canvas.height = window.innerHeight;
			// };
			// window.addEventListener('resize', resize);
		}
		console.log(window.innerHeight, window.innerWidth);
		console.log(window.screen.height, window.screen.width);
		console.log(window.screen);
	}, [canvas.current]);

	const pos = { x: 0, y: 0 };

	const setPosition = (e: React.MouseEvent) => {
		if (!canvas.current) return;
		const n = canvas.current.width / canvas.current.offsetWidth
		const c = 20
		pos.x = e.clientX - c;
		pos.y = e.clientY - c;
	};

	const draw = (e: React.MouseEvent) => {
		// console.log(e.buttons, ctx);
		if (e.buttons !== 1 || !ctx) return;

		// console.log('mouse');

		ctx.beginPath();

		ctx.lineWidth = 150;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#2b32c0';

		ctx.moveTo(pos.x, pos.y);
		setPosition(e);
		ctx.lineTo(pos.x, pos.y);

		ctx.stroke();
	};
	console.log(container.current?.offsetHeight);

	// if (!container.current) return;

	// const getStyle = () => {
	//
	// }
	const c = 40

	const s = [
		window.innerHeight -c,
		window.innerWidth -c
	]

	return (
		<div className='app' ref={container} style={{height: s[0], width: s[1]}}>
			<canvas ref={canvas}
					height={s[0]} width={s[1]}
					// height={'100%'} width={'100%'}
				className='canvas'
					onMouseMoveCapture={draw}
					onMouseDown={setPosition} onMouseEnter={setPosition} />
		</div>
	);
}

export default App;
