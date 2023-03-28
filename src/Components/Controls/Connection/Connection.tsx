import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { shapeSaver } from '../../Brushes/toolOrchestrator';
import { useSelector } from 'react-redux';
import { IControlState, IToolParam } from '../../../redux/slices/controlSlice';
import { bbMove, drawDot, getDist } from '../../Brushes/baseBrush';
import Sections from './Sections/Sections';
import { ConnectionContext } from './ConnectionProvider';
import { DataConnection } from 'peerjs';

const Connection: FC<{canvas: RefObject<HTMLCanvasElement>}> = ({ canvas }) => {
	const {connections, openEvent} = useContext(ConnectionContext);

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

	const f = useRef(false);
	useEffect(() => {
		if (!f.current && connections == null) {
			f.current = true;
			return;
		}
		regEvents(canvas.current!, tool, connections);
	}, [tool, params]);

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

				<Sections section={section}/>
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

export const regEvents = (canvas: HTMLCanvasElement, tool: IToolParam, connections: DataConnection[]) => {
	const ctx = canvas.getContext('2d')!;

	const restore = () => {
		const ctx = canvas.getContext('2d')!;
		ctx.strokeStyle = tool.color;
		ctx.fillStyle = tool.color;
		ctx.globalAlpha = tool.opacity;
	};

	const dataEvent = async (data: any) => {
		if (typeof data == 'string') {
			await shapeSaver(data, ctx, canvas.height, canvas.width);
			return;
		}

		await networkDraw(data, ctx, canvas, restore);
	};

	connections.forEach(v => v.off('data'));
	connections.forEach(v => v.on('data', dataEvent));
};

export default Connection;

// const makePeer = () => {
// 	makeHostPeer();
//
// 	peer.on('connection', (data: any) => {
// 		connections.push(data);
// 		regEvents();
// 		data.on('open', () => {
// 			const save = canvas.current?.toDataURL();
// 			data.send(save);
// 		});
// 	});
// 	console.log(peer.id);
// };
// const connectToPeer = () => {
// 	if (!peer) return;
// 	const value = inputRef.current!.value;
//
// 	const items = peer.connect(value);
// 	console.log(items);
// 	connections.push(items);
//
// 	regEvents();
// };
// const makeRoom = () => {
// 	if (!peer)
// 		makePeer();
//
// 	console.log(peer);
//
// 	socket.emit('makeRoom', {
// 		hostPeerId: peer?.id,
// 		slots: 5,
// 		isPrivate: false,
// 	});
// };
// const regEvent = () => {
// 	socket.on('rooms', (data: any) => {
// 		console.log(data);
// 		setRooms(data);
// 	})
// }
// const openEvent = () => {
// 	socket.emit('subscribe');
// 	socket.on('rooms', (data: any) => {
// 		console.log(data);
// 		setRooms(data);
// 	});
//
// 	// if (!subscribed) setSubscribed(true);
// 	console.log(rooms);
// };