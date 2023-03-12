import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { connType } from '../../../App';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { useSelector } from 'react-redux';
import { IControlState } from '../../../redux/slices/controlSlice';

// let connection.peer: Peer;
// let conn: DataConnection;

interface IConn {
	canvas: RefObject<HTMLCanvasElement>;
	connection: connType;
}

const Connection: FC<IConn> = ({ canvas, connection }) => {
	// console.log(connection);

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

	const dataEvent = (ctx: CanvasRenderingContext2D) => (data: any) => {
		if (typeof data == 'string'){
			shapeSaver(data, ctx, canvas.current!.height, canvas.current!.width)
			return;
		}

		networkDraw(data, ctx, restore);
	}

	const openEvent = () => {
		const save = canvas.current?.toDataURL();
		connection.conn?.send(save);
	}

	// type IRole = 'master' | 'slave'
	//
	// let role: IRole = 'master';

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
		// connection.conn?.off('open', openEvent)

		connection.conn?.on('data', dv)

		// if (role == 'master'){
		// 	connection.conn?.on('open', openEvent)
		// }else{
		// 	connection.conn?.on('open', () => {
		// 		console.log('?');
		// 	})
		// }
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
		}); // signal tunnel open: server-client

		connection.peer.on('connection', (data: any) => {
			connection.conn = data;
			console.log(data);

			regEvents();
			// const ctx = canvas.current!.getContext('2d')!;

			// data.on('data', (data: any) => {
			// 	networkDraw(data, ctx, restore);
			// }); // getting data from slave
			data.on('open', () => {
				const save = canvas.current?.toDataURL();
				data.send(save);
			}); // sending data to slave
		}); // slave connected to master: client-client slave-master
		console.log('make');
	};

	const connHandle = () => {
		if (!connection.peer) return;
		const value = inputpeer.current!.value;

		connection.conn = connection.peer.connect(value); // slave connecting to master

		regEvents()

		// const ctx = canvas.current!.getContext('2d')!;
		// connection.conn.on('data', (data: any) => {
		// 	if (typeof data == 'string'){
		// 		shapeSaver(data, ctx, canvas.current!.height, canvas.current!.width)
		// 		return;
		// 	}
		//
		// 	networkDraw(data, ctx, restore);
		// }); // slave getting data from master

		connection.conn.on('open', () => {
			// connection.conn?.send('hi!');
		}); // you as slave connected to master: client-client slave-master.
	};

	const sendHandle = () => {
		console.log(tool.color, params.width);
		// const dv = dataEvent(ctx)
		connection.conn?.off('data')
		// if (!connection.conn) return;
		// connection.conn.send(inputpeer.current!.value);
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

const networkDraw = (data: any, ctx: CanvasRenderingContext2D, restore: () => void) => {
	const { condition, x, y, params } = data;

	switch (condition) {
	case 'start':
		ctx.strokeStyle = params.color;
		ctx.fillStyle = params.color;
		ctx.lineWidth = params.width;
		ctx.globalAlpha = params.opacity;

		ctx.beginPath();
		ctx.moveTo(x, y);
		break;
	case 'move':
		ctx.lineTo(x, y);
		// 			// await shapeSaver(saved, ctx, canvas.height, canvas.width)
		ctx.stroke();
		break;
	case 'end':
		ctx.closePath();

		restore()
	}

}

export default Connection;