import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';

type RoomRole = 'Host' | 'User'

type IUser = {
	name: string;
	socketId: string;
	peerId: string;
	roomRole: RoomRole;
}

type IRoom = {
	name: string;
	slots: number;
	isPrivate: boolean;
	password: string;

	users: IUser[]
}

let socket: Socket;
let peer: Peer | null = null;
const connections: DataConnection[] = [];

export const ConnectionContext = createContext<{ peer: Peer | null, connections: DataConnection[],
	socket: Socket | null, rooms: IRoom[], makePeer: () => void, openEvent: (() => void) | undefined }>({
		connections: [],
		makePeer: () => {console.log('undefined');},
		openEvent: undefined,
		peer: null,
		rooms: [],
		socket: null
	}
);

export const ConnectionProvider: FC<{ children: ReactNode, canvas: HTMLCanvasElement | null }> = ({ children, canvas }) => {
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
		console.log(rooms);
	};
	const makePeer = () => {
		if (peer !== null) return;

		peer = new Peer({
			host: 'localhost',
			port: 3002,
		});

		peer.on('open', (data: any) => {
			console.log(data);
		})

		console.log(canvas);
	};

	return (
		<ConnectionContext.Provider value={{ peer, connections, socket, rooms, makePeer, openEvent }}>
			{children}
		</ConnectionContext.Provider>
	);
};