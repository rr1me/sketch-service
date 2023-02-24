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

let scale = 1;
let coords = 1;

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

				save = canvas.current!.toDataURL()!;

				const h = canvas.current!.height;
				const w = canvas.current!.width;


				const direction = e.deltaY === 100 ? true : false;
				const number = 0.05;
				console.log(e.deltaY);

				if (!type){
					scale = direction ? scale+number : scale- number;

					ctx.scale(scale, scale);
					console.log('scale: '+scale);
				}else{
					coords = direction ? coords+number : coords- number;

					const coord = direction ? 1 : -1;
					ctx.translate(coord, coord);
					console.log('coord: '+coord);
				}


				ctx.clearRect(0,0, w, h)
				shapeSaver(save, ctx, h, w);
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