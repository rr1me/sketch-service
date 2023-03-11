import s from './ControlledCanvas.module.scss';
import React, { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IControlState } from '../../redux/slices/controlSlice';
import toolOrchestrator, { shapeSaver } from '../Brushes/toolOrchestrator';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';
import { connType } from '../../App';

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

let socket: Socket;

const useControlledCanvas = (connection: connType): IUseControlledCanvas => {
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

	const canvas = useRef<HTMLCanvasElement>(null);


	// const [peer, setPeer] = useState<any>(null);
	// const [localStream, setLocalStream] = useState<any>(null);
	// const [remoteStreams, setRemoteStreams] = useState<any>([]);

	// let peer: Peer;
	// let conn: DataConnection;


	useEffect(() => {
		// peer = new Peer('my-peer-id',{
		// 	host: 'localhost',
		// 	port: 3001,
		// 	path: '/peerjs'
		// });

		// conn = peer.connect('my-peer-id');
		// conn.on('open', () => {
		// 	console.log('hui');
		// 	conn.send('hi!');
		// });

		
		// peer.on('connection', (conn) => {
		// 	console.log(conn);
		// 	// conn.on('data', (data) => {
		// 	// 	// Will print 'hi!'
		// 	// 	console.log(data);
		// 	// });
		// 	// conn.on('open', () => {
		// 	// 	conn.send('hello!');
		// 	// });
		// });


	}, []);


	useEffect(() => {
		if (!canvas.current) return;

		const ctx = canvas.current.getContext('2d')!;

		socket = io('http://localhost:3001/gateway');
		socket.on('message', (message: { type: string, x: number, y: number }) => {
			// console.log(message);
			const { type, x, y } = message;
			switch (type) {
			case 'start':
				ctx.beginPath();
				ctx.moveTo(x, y);
				break;
			case 'move':
				ctx.lineTo(x, y);
				// await shapeSaver(saved, ctx, canvas.height, canvas.width)
				ctx.stroke();
				break;
			case 'end':
				ctx.closePath();
			}
		});
		socket.emit('message', 'Hello, server!');
		return () => {
			socket.disconnect();
		};
	}, []);
	// const inputpeer = useRef<HTMLInputElement>(null);

	// const makeHandle = () => {
	// 	const value = inputpeer.current!.value;
	// 	console.log(value);
	// 	peer = new Peer(value,{
	// 		host: 'localhost',
	// 		port: 3001,
	// 		path: '/peerjs'
	// 	});
	// 	peer.on('connection', (conn) => {
	// 		console.log(conn);
	// 		conn.on('data', (data) => {
	// 			// Will print 'hi!'
	// 			console.log(data);
	// 		});
	// 		conn.on('open', () => {
	// 			conn.send('hello!');
	// 		});
	// 	});
	// 	console.log('make');
	// }
	// const connHandle = () => {
	// 	const value = inputpeer.current!.value;
	// 	console.log(value);
	// 	console.log(peer);
	// 	conn = peer.connect(value);
	// 	conn.on('data', (data) => {
	// 		console.log(data);
	// 	})
	// 	conn.on('open', () => {
	// 		console.log('hui');
	// 		conn.send('hi!');
	// 	});
	// 	console.log('conn');
	// }
	//
	// const sendHandle = () => {
	// 	conn.send(inputpeer.current!.value);
	// }

	useEffect(() => {
		if (canvas.current) {
			const [mouseDown, mouseMove, mouseUp] = toolOrchestrator(tool, params, canvas.current, pos, dispatch, connection, socket);
			canvas.current.addEventListener('mousedown', mouseDown);
			canvas.current.addEventListener('mousemove', mouseMove);
			canvas.current.addEventListener('mouseup', mouseUp);
			return () => {
				canvas.current!.removeEventListener('mousedown', mouseDown);
				canvas.current!.removeEventListener('mousemove', mouseMove);
				canvas.current!.removeEventListener('mouseup', mouseUp);
			};
		}
	}, [tool, params]);

	return {
		canvas: canvas, controlledCanvas: (
			<>
				{/* <button onClick={makeHandle}>make</button> */}
				{/* <button onClick={connHandle}>conn</button> */}
				{/* <button onClick={sendHandle}>send</button> */}
				{/* <input ref={inputpeer}/> */}
				<canvas ref={canvas}
						height={1080} width={1920}
						style={{ height: res[0], width: res[1] }}
						className={s.canvas}
				/>
			</>
		),
	};
};

export default useControlledCanvas;