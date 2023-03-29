import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';
import { IRoom, IUser } from './types';
import { IToolParam } from '../../../redux/slices/controlSlice';
import { dataEvent } from './ConnectionUtils';

let socket: Socket;
// let peer: Peer | null = null;
const connections: DataConnection[] = [];

const sendData = (data: any) => connections.forEach(v => v.send(data));

export const ConnectionContext = createContext<{
	// peer: Peer | null,
	connections: DataConnection[],
	socket: Socket | null, rooms: IRoom[], openEvent: (() => void) | undefined, createRoom: (room: IRoom, tool: IToolParam) => void,
	enterInRoom: (room: IRoom, tool: IToolParam) => void, sendData: (data: any) => void, getConnections: () => typeof connections
}>({
		connections: [],
		openEvent: undefined,
		// peer: null,
		rooms: [],
		socket: null,
		createRoom: () => {
			console.log('undefined');
		},
		enterInRoom: () => {
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
		socket.on('rooms', (data: IRoom[]) => {
			console.log(data);
			setRooms(data);
		});
	};

	const makePeer = () => {
		return new Peer({
			host: 'localhost',
			port: 3002,
		});
		// return peer;
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

			dataConnection.on('close', () => {
				console.log('[u] disconnect');
			});

			connections.push(dataConnection);
		});
	};

	const enterInRoom = (room: IRoom, tool: IToolParam) => {
		const peer = makePeer();

		peer.on('open', () => {
			const user: IUser = { name: 'ohellothere', peerId: peer.id, roomRole: 'User', socketId: socket.id };
			socket.emit('enter', { roomName: room.name, user });

			for (const user of room.users) {
				const connection = peer.connect(user.peerId);
				connection.on('data', dataEvent(canvas!, tool));

				connection.on('close', () => {
					if (user.roomRole === 'Host') {
						peer.destroy();
						connections.splice(0, connections.length);
					}

					console.log('[x] disconnect');
				});

				connections.push(connection);
			}
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			dataConnection.on('data', dataEvent(canvas!, tool));

			dataConnection.on('close', () => {
				console.log('[c] disconnect');
			});

			connections.push(dataConnection);
		});
	};

	const getConnections = () => connections;

	return (
		<ConnectionContext.Provider value={{
			// peer,
			connections,
			socket,
			rooms,
			openEvent,
			createRoom,
			enterInRoom,
			sendData,
			getConnections,
		}}>
			{children}
		</ConnectionContext.Provider>
	);
};