import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { connType } from '../../../App';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { useSelector } from 'react-redux';
import { IControlState } from '../../../redux/slices/controlSlice';
import { bbMove, drawDot, getDist } from '../../Brushes/baseBrush';
import { io, Socket } from 'socket.io-client';
import Sections from './Sections/Sections';

interface IConn {
	canvas: RefObject<HTMLCanvasElement>;
	connection: connType;
}

type RoomRole = 'Host' | 'User'

type IUser = {
	name: string;
	socketId: string;
	peerId: string;
	roomRole: RoomRole;
}

type IRoom = {
	name: string;
	// hostSocketId: string;
	// hostPeerId: string;
	slots: number;
	isPrivate: boolean;
	password: string;

	users: IUser[]
}

let socket: Socket;

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

	const [subscribed, setSubscribed] = useState(false);
	const [rooms, setRooms] = useState<IRoom[]>([]);

	useEffect(() => {
		socket = io('http://localhost:3001/gateway');

		socket.on('message', (socket: any) => {
			console.log(socket);
		});

		socket.on('rooms', (data: any) => {
			console.log(data);
			setRooms(data);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const f = useRef(false);
	useEffect(() => {
		if (!f.current && connection.conn == null) {
			f.current = true;
			return;
		}

		regEvents();
	}, [tool, params]);

	const inputRef = useRef<HTMLInputElement>(null);
	const [id, setId] = useState<string>('');

	const regEvents = () => {
		const ctx = canvas.current!.getContext('2d')!;

		const restore = () => {
			const ctx = canvas.current!.getContext('2d')!;
			ctx.strokeStyle = tool.color;
			ctx.fillStyle = tool.color;
			ctx.globalAlpha = tool.opacity;
		};

		const dataEvent = async (data: any) => {
			if (typeof data == 'string') {
				await shapeSaver(data, ctx, canvas.current!.height, canvas.current!.width);
				return;
			}

			await networkDraw(data, ctx, canvas.current!, restore);
		};

		connection.conn?.forEach(v => v.off('data'));
		connection.conn?.forEach(v => v.on('data', dataEvent));
	};

	const makePeer = () => {
		connection.peer = new Peer({
			host: 'localhost',
			port: 3002,
		});

		connection.peer.on('open', (data: any) => {
			console.log(data);
			setId(data);
		});

		connection.peer.on('connection', (data: any) => {
			connection.conn?.push(data);
			regEvents();
			data.on('open', () => {
				const save = canvas.current?.toDataURL();
				data.send(save);
			});
		});
		console.log(connection.peer.id);
	};

	const connectToPeer = () => {
		if (!connection.peer) return;
		const value = inputRef.current!.value;

		const items = connection.peer.connect(value);
		console.log(items);
		connection.conn?.push(items);

		regEvents();
	};

	const makeRoom = () => {
		if (!connection.peer)
			makePeer();

		console.log(connection.peer);

		socket.emit('makeRoom', {
			hostPeerId: connection.peer?.id,
			slots: 5,
			isPrivate: false,
		});
	};

	// const regEvent = () => {
	// 	socket.on('rooms', (data: any) => {
	// 		console.log(data);
	// 		setRooms(data);
	// 	})
	// }
	const openEvent = () => {
		socket.emit('subscribe');
		socket.on('rooms', (data: any) => {
			console.log(data);
			setRooms(data);
		});

		// if (!subscribed) setSubscribed(true);
		console.log(rooms);
	};

	const [section, setSection] = useState(0);
	const ctrlButtons = [
		ic.list,
		ic.plus,
		ic.connect,
		ic.filter,
	];
	const ctrlButtonHandler = (section: number) => () => setSection(section);

	return (
		<MovingBlock name={ic.connection} side={'top'} outsideOffset={250} gap={10} locationOffsetSide={'right'}
					 locationOffset={10} openEvent={openEvent}>
			<div className={s.connection}>
				<div className={s.ctrl}>
					{ctrlButtons.map((v, i) =>
						<button key={i} onClick={ctrlButtonHandler(i)}
								className={s.ctrlButton + (i === section ? ' ' + s.iconUsing : '')}>{v}</button>,
					)}
				</div>

				<Sections section={section} rooms={rooms}/>

				{/* <div className={s.connList}> */}
				{/* 	{rooms.map((v)=> */}
				{/* 		<div key={v.users[0].socketId} className={s.room}> */}
				{/* 			<span>{v.name}</span> */}
				{/* 			<div className={s.listEnd}> */}
				{/* 				{v.isPrivate ? <span>{ic.locker}</span> : null} */}
				{/* 				<span>{v.users.length}/{v.slots}</span> */}
				{/* 			</div> */}
				{/* 		</div> */}
				{/* 	)} */}
				{/* </div> */}


				{/* <span>{section}</span> */}

				{/* <div className={s.ctrl}> */}
				{/* <button onClick={makePeer}>make</button> */}
				{/* <button onClick={connectToPeer}>conn</button> */}
				{/* <button onClick={makeRoom}>makeRoom</button> */}
				{/* <button onClick={regEvent}>reg</button> */}
				{/* </div> */}
				{/* <input className={s.input} ref={inputRef} /> */}
				{/* <div>id: {id}</div> */}
				{/* <div>{rooms.map((v:any, i)=>{ */}
				{/* 	return ( */}
				{/* 		<div key={i}>{v.hostSocketId}</div> */}
				{/* 	) */}
				{/* })}</div> */}
			</div>
		</MovingBlock>
	);

};

let radius = 0;
let dist = 0;
let prev: { x: number, y: number } = { x: 0, y: 0 };

const networkDraw = async (data: any, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, restore: () => void) => {
	const { condition, x, y, params } = data;

	switch (condition) {
	case 'start':
		ctx.strokeStyle = params.color;
		ctx.fillStyle = params.color;
		radius = params.width;
		dist = getDist(radius);
		ctx.globalAlpha = params.opacity;

		drawDot(ctx, x, y, radius);
		prev = { x: x, y: y };
		break;
	case 'move':
		bbMove(prev, { x, y }, ctx, radius, dist);
		break;
	case 'end':
		restore();
	}
};

export default Connection;