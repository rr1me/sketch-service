import s from './ControlledCanvas.module.scss';
import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IControlState } from '../../redux/slices/controlSlice';
import toolOrchestrator from '../Brushes/toolOrchestrator';
import { ConnectionContext } from '../Controls/Connection/ConnectionProvider';

interface IUseControlledCanvas {
	canvas: RefObject<HTMLCanvasElement>,
	controlledCanvas: JSX.Element
}

export interface IPos {
	x: number,
	y: number
}

const pos: IPos = { x: 0, y: 0 };

const useControlledCanvas = (): IUseControlledCanvas => {
	const dispatch = useDispatch();
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const params = useSelector((state: any) => { // am I really want to assign type for this callback? x_x
		const type = tool.type;
		switch (type) {
		case 'Brush':
			return state.baseBrushSlice;
		case 'Square':
			return state.squareSlice;
		case 'Line':
			return state.lineSlice;
		default:
			return state.baseBrushSlice;
		}
	});
	const {sendData} = useContext(ConnectionContext);

	const canvas = useRef<HTMLCanvasElement>(null);

	const [height, setHeight] = useState((window.outerHeight - 71) - getRatio())
	const [width, setWidth] = useState(window.outerWidth - getRatio())

	useEffect(() => {
		if (canvas.current) {

			const [mouseDown, mouseMove, mouseUp] = toolOrchestrator(tool, params, canvas.current, pos, dispatch, sendData);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);

			const resizeEvent = () => {
				const r = getRatio()
				setHeight((window.outerHeight - 71) - r)
				setWidth(window.outerWidth - r)
				// console.log('????');
			}
			console.log(document.documentElement.scrollTop, document.documentElement.scrollHeight, document.documentElement.scrollLeft, document.documentElement.scrollWidth);


			window.addEventListener('resize', resizeEvent)
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);

				window.removeEventListener('resize', resizeEvent)
			};
		}
	}, [tool, params]); // todo might be good place to update peerConnection events

	return {
		canvas: canvas, controlledCanvas: (
			<canvas ref={canvas}
					height={1080} width={1920}
					// style={{ height: height, width: width }}
					style={{ height: 1075, width: 1915 }}
					className={s.canvas}
			/>
		),
	};
};

export default useControlledCanvas;

const getRatio = () => {
	const isFullscreen = window.innerWidth === screen.availWidth && window.outerWidth === screen.availWidth;
	return isFullscreen ? 50 : 74
}