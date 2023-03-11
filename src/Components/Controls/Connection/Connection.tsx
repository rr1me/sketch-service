import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, RefObject, useRef, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { connType } from '../../../App';

// let peer: Peer;
// let conn: DataConnection;

interface IConn {
	canvas: RefObject<HTMLCanvasElement>;
	connection: connType;
}

const Connection: FC<IConn> = ({ canvas, connection }) => {
	console.log(connection);

	const inputpeer = useRef<HTMLInputElement>(null);
	const [id, setId] = useState<string>('');

	const makeHandle = () => {
		const value = inputpeer.current!.value;
		console.log(value);
		console.log(connection);
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
			console.log(data);
			const ctx = canvas.current!.getContext('2d')!;
			data.on('data', (data: any) => {
				// Will print 'hi!'
				console.log(data);
				const { type, x, y } = data;
				console.log(type);
				switch (type) {
				case 'start':
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
				}
			});
			data.on('open', () => {
				data.send('hello!');
			});
		});
		console.log('make');
	};
	const connHandle = () => {
		if (!connection.peer) return;
		const value = inputpeer.current!.value;
		console.log(value);
		console.log(connection.peer);
		connection.conn = connection.peer.connect(value);
		const ctx = canvas.current!.getContext('2d')!;
		connection.conn.on('data', (data: any) => {
			console.log(data);
			const { type, x, y } = data;
			console.log(type);
			switch (type) {
			case 'start':
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
			}
		});
		connection.conn.on('open', () => {
			console.log('hui');
			connection.conn?.send('hi!');
		});
		console.log('conn');
	};

	const sendHandle = () => {
		if (!connection.conn) return;
		connection.conn.send(inputpeer.current!.value);
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

export default Connection;