import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';
import { IRoom } from './types';
import { IToolParam } from '../../../redux/slices/controlSlice';
import { dataEvent } from './ConnectionUtils';

let socket: Socket;
let peer: Peer | null = null;
const connections: DataConnection[] = [];

const sendData = (data: any) => connections.forEach(v => v.send(data));

export const ConnectionContext = createContext<{
	peer: Peer | null, connections: DataConnection[],
	socket: Socket | null, rooms: IRoom[], openEvent: (() => void) | undefined, createRoom: (room: IRoom, tool: IToolParam) => void,
	connectToPeer: (peerId: string, tool: IToolParam) => void, sendData: (data: any) => void, getConnections: () => typeof connections
}>({
		connections: [],
		openEvent: undefined,
		peer: null,
		rooms: [],
		socket: null,
		createRoom: (room: IRoom) => {
			console.log('undefined');
		},
		connectToPeer: (peerId, tool) => {
			console.log('undefined');
		},
		sendData: sendData,
		getConnections: () => connections,
	},
);

export const ConnectionProvider: FC<{ children: ReactNode, canvas: HTMLCanvasElement | null }> = ({
	children,
	canvas,
}) => {
	const [rooms, setRooms] = useState<IRoom[]>([]);

	useEffect(() => {
		socket = io('http://localhost:3001/gateway');

		socket.on('message', (socket: any) => {
			console.log(socket);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const openEvent = () => {
		socket.emit('subscribe');
		socket.on('rooms', (data: any) => {
			setRooms(data);
		});
	};


	const makePeer = () => {
		peer = new Peer({
			host: 'localhost',
			port: 3002,
		});
		return peer;
	};

	const createRoom = (room: IRoom, tool: IToolParam) => {
		const peer = makePeer();

		peer.on('open', (peerId: string) => {
			room.users[0].socketId = socket.id;
			room.users[0].peerId = peerId;

			socket.emit('makeRoom', room);
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			dataConnection.on('open', () => {
				const save = canvas?.toDataURL();
				dataConnection.send(save);
			});

			dataConnection.on('data', dataEvent(canvas!, tool));

			connections.push(dataConnection);
		});
	};

	const connectToPeer = (peerId: string, tool: IToolParam) => {
		const peer = makePeer();

		peer.on('open', () => {
			const connection = peer.connect(peerId);

			connection.on('data', dataEvent(canvas!, tool));

			connections.push(connection);
		});
	};

	const getConnections = () => connections;

	return (
		<ConnectionContext.Provider value={{
			peer,
			connections,
			socket,
			rooms,
			openEvent,
			createRoom,
			connectToPeer,
			sendData,
			getConnections,
		}}>
			{children}
		</ConnectionContext.Provider>
	);
};