import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { connType } from '../../../App';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { useSelector } from 'react-redux';
import { IControlState } from '../../../redux/slices/controlSlice';

interface IConn {
	canvas: RefObject<HTMLCanvasElement>;
	connection: connType;
}

const Connection: FC<IConn> = ({ canvas, connection }) => {
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

	const inputpeer = useRef<HTMLInputElement>(null);
	const [id, setId] = useState<string>('');

	const dataEvent = (ctx: CanvasRenderingContext2D) => async (data: any) => {
		if (typeof data == 'string'){
			await shapeSaver(data, ctx, canvas.current!.height, canvas.current!.width)
			return;
		}

		await networkDraw(data, ctx, canvas.current!, restore);
	}

	const f = useRef(false);
	useEffect(() => {
		if (!f.current && connection.conn == null){
			f.current = true;
			return;
		}

		regEvents()
	}, [tool, params])

	const regEvents = () => {
		const ctx = canvas.current!.getContext('2d')!;

		const dv = dataEvent(ctx)
		connection.conn?.off('data')

		connection.conn?.on('data', dv)
	}

	const restore = () => {
		const ctx = canvas.current!.getContext('2d')!;
		console.log(tool.color, params.width);
		ctx.strokeStyle = tool.color;
		ctx.fillStyle = tool.color;
		ctx.lineWidth = params.width.v;
		ctx.globalAlpha = tool.opacity;
	};

	const makeHandle = () => {
		connection.peer = new Peer({
			host: 'localhost',
			port: 3001,
			path: '/peerjs',
		});

		connection.peer.on('open', (data: any) => {
			console.log(data);
			setId(data);
		});

		connection.peer.on('connection', (data: any) => {
			connection.conn = data;
			regEvents();
			data.on('open', () => {
				const save = canvas.current?.toDataURL();
				data.send(save);
			});
		});
		console.log('make');
	};

	const connHandle = () => {
		if (!connection.peer) return;
		const value = inputpeer.current!.value;

		connection.conn = connection.peer.connect(value); // slave connecting to master

		regEvents()

		connection.conn.on('open', () => {
			console.log('conn');
		});
	};

	const sendHandle = () => {
		console.log(tool.color, params.width);
	};

	return (
		<MovingBlock name={ic.connection} side={'top'} outsideOffset={250} gap={10} locationOffsetSide={'right'}
					 locationOffset={0}>
			<div className={s.connection}>
				<div className={s.ctrl}>
					<button onClick={makeHandle}>make</button>
					<button onClick={connHandle}>conn</button>
					<button onClick={sendHandle}>send</button>
				</div>
				<input className={s.input} ref={inputpeer} />
				<div>id: {id}</div>
			</div>
		</MovingBlock>
	);
};

let saved: any;

let dataArray: any[];

const networkDraw = async (data: any, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, restore: () => void) => {
	const { condition, x, y, params } = data;

	dataArray.push(data);

	switch (condition) {
	case 'start':
		ctx.strokeStyle = params.color;
		ctx.fillStyle = params.color;
		ctx.lineWidth = params.width;
		ctx.globalAlpha = params.opacity;

		ctx.beginPath();
		ctx.moveTo(x, y);

		saved = canvas.toDataURL();
		break;
	case 'move':
		ctx.lineTo(x, y);
		await shapeSaver(saved, ctx, canvas.height, canvas.width)
		ctx.stroke();
		break;
	case 'end':
		ctx.closePath();

		restore();


	}
}

export default Connection;