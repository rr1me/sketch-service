import React, { useEffect, useRef, useState } from 'react';
import s from './App.module.scss';

function App() {
	const canvas = useRef<HTMLCanvasElement>(null);

	let ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

	useEffect((): void => {
		if (canvas.current)
			ctx = canvas.current.getContext('2d')!;
	}, [ctx]);

	const pos = { x: 0, y: 0 };

	const fixRatio = 40;

	const res = [
		(window.outerHeight-71) - fixRatio,
		window.outerWidth - fixRatio,
	];

	const pressed = useRef(false);

	const [index, setIndex] = useState<number>(-1);

	const mouseDown = (e: React.MouseEvent) => {
		if (!canvas.current) return;

		const c = 20;
		pos.x = e.clientX - c;
		pos.y = e.clientY - c;

		if (!pressed.current){
			pressed.current = true;
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 5/2, 0, 2 * Math.PI, true);
			ctx.fillStyle = '#ff8500';
			ctx.fill();
		}
	};

	const [saves, setSaves] = useState<string[]>([]);

	const mouseUp = () => {
		pressed.current = false;
		const items = canvas.current?.toDataURL();
		setSaves(v=>{
			v.length-1 !== index && v.splice(index+1, v.length)
			return v.concat(items!)
		})
		setIndex(v=>v+1);
	}

	const mouseMove = (e: React.MouseEvent) => {
		if (e.buttons !== 1 || !ctx) return;

		ctx.beginPath();

		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#ff8500';

		ctx.moveTo(pos.x, pos.y);
		mouseDown(e);
		ctx.lineTo(pos.x, pos.y);

		ctx.stroke();
	};

	const clearHandler = () => {
		setIndex(-1);
		setSaves([]);
		ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
	};

	const redraw = async (direction:boolean) => {
		const img = new Image();

		img.src = saves[index-(direction ? 1 : -1)];
		await img.onload;
		ctx.clearRect(0, 0, canvas.current?.width as number, canvas.current?.height as number);
		ctx.drawImage(img, 0, 0);

		setIndex(v=>v-(direction ? 1 : -1));
	}

	const undoHandler = () => index > 0 && redraw(true);
	const redoHandler = () => saves.length-1 > index && redraw(false);

	return (
		<div className={s.app} style={{ height: res[0], width: res[1] }}>
			<div className={s.buttons}>
				<button onClick={clearHandler}>clear</button>
				<button onClick={undoHandler}>undo</button>
				<button onClick={redoHandler}>redo</button>
				<button onClick={() => {console.log(saves.length, index)}}>check</button>
			</div>

			<canvas ref={canvas}
					height={res[0]} width={res[1]}
					className={s.canvas}
					onMouseMoveCapture={mouseMove}
					onMouseDown={mouseDown}
					// onMouseEnter={mouseDown}
					onMouseUp={mouseUp}
			/>
		</div>
	);
}

export default App;
