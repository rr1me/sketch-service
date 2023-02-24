import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IControlState } from '../../redux/slices/controlSlice';
import toolOrchestrator, { shapeSaver } from '../Brushes/toolOrchestrator';

interface IUseControlledCanvas {
	canvas: RefObject<HTMLCanvasElement>,
	controlledCanvas: JSX.Element
}

export interface IPos {
	x: number,
	y: number
}

const pos: IPos = { x: 0, y: 0 };
const fixRatio = 50;
const res = [
	(window.outerHeight - 71) - fixRatio,
	window.outerWidth - fixRatio,
];

// let scale = 1;
// let originx = 0;
// let originy = 0;
const zoomIntensity = 0.1;
// let coords = 1;

let save: any;

const useControlledCanvas = (): IUseControlledCanvas => {
	const dispatch = useDispatch();
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const [type, setType] = useState(false);

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			const [mouseDown, mouseMove, mouseUp] = toolOrchestrator(tool, canvas.current, pos, dispatch);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);

			const zoom = (e: any) => {
				const ctx = canvas.current!.getContext('2d')!;
				const h = canvas.current!.height;
				const w = canvas.current!.width;

				const sw = Number(canvas.current?.style.width.match(/\d+/g)![0]);
				const sh = Number(canvas.current?.style.height.match(/\d+/g)![0]);

				// console.log(canvas.current?.width, canvas.current?.height);
				// console.log(canvas.current?.style.width, canvas.current?.style.height);

				save = canvas.current!.toDataURL()!;
				// ctx.save()

				const wheel = e.deltaY < 0 ? 1 : -1;

				// Compute zoom factor.
				const zoom = wheel > 0 ? true : false;
				// console.log(wheel, zoom, scale);

				ctx.translate(sw/2, sh/2);

				// const chn = scale - (scale * zoom);
				// scale = scale + zoom;
				// const originx = -(pos.x * zoom)
				// const originy = -(pos.y * zoom)

				const scale = zoom ? 1.01 : 0.99
				ctx.scale(scale, scale);
				// Offset the visible origin to it's proper position.
				ctx.translate(-sw/2, -sh/2);

				// Update scale and others.
				// scale = wheel > 1 ? scale + 0.1 : scale - 0.1;
				// visibleWidth = width / scale;
				// visibleHeight = height / scale;

				ctx.clearRect(0,0, w, h)
				// ctx.restore()
				shapeSaver(save, ctx, h, w);
				ctx.save()
				ctx.restore()





				// save = canvas.current!.toDataURL()!;

				// const h = canvas.current!.height;
				// const w = canvas.current!.width;
				//
				//
				// const direction = e.deltaY === 100 ? true : false;
				// const number = 0.05;
				// console.log(e.deltaY);
				//
				// scale = direction ? 1+number : 1-number;
				// ctx.scale(scale, scale);
				// ctx.translate(-(scale-35), -(scale-35));

				// if (!type){
				// 	scale = direction ? scale+number : scale- number;
				//
				// 	ctx.scale(scale, scale);
				// 	ctx.translate(-scale, -scale);
				// 	console.log('scale: '+scale);
				// }else{
				// 	coords = direction ? coords+number : coords- number;
				//
				// 	const coord = direction ? 1 : -1;
				// 	ctx.translate(coord, coord);
				// 	console.log('coord: '+coord);
				// }


				// ctx.clearRect(0,0, w, h)
				// shapeSaver(save, ctx, h, w);
			}

			canvas.current.addEventListener('wheel', zoom)
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);
				canvas.current!.removeEventListener('wheel', zoom)
			};
		}
	}, [tool, type]);

	return {
		canvas: canvas, controlledCanvas: (
			<>
				{/* <button onClick={()=>{ */}
				{/* 	setType(v=>{ */}
				{/* 		const x = !v; */}
				{/* 		console.log(x); */}
				{/* 		return x; */}
				{/* 	}); */}
				{/* }}>dsa</button> */}
				<canvas ref={canvas}
						height={1080} width={1920}
						style={{height: res[0], width: res[1]}}
						className={s.canvas}
				/>
			</>
		),
	};
};

export default useControlledCanvas;