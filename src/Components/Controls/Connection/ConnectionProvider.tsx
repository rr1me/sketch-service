import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';
import { IRoom, IUser, PeerData } from './types';
import { IToolParam } from '../../../redux/slices/controlSlice';
import { dataEvent } from './ConnectionUtils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { actions } from '../../../redux/slices/connectionSlice';

let socket: Socket;
let peer: Peer;
const connections: DataConnection[] = [];

const sendData = (data: PeerData) => {
	connections.forEach(v => v.send(data));
};

export const ConnectionContext = createContext<{
	username: string,
	setUsername: Dispatch<SetStateAction<string>>
	connections: DataConnection[],
	socket: Socket | null, rooms: IRoom[],
	openEvent: (() => void) | undefined,
	createRoom: (room: IRoom, tool: IToolParam) => void,
	enterInRoom: (room: IRoom, tool: IToolParam) => void,
	sendData: (data: PeerData) => void,
	getConnections: () => typeof connections,
	disconnect: () => void,
	kick: (peerId: string) => void
}>({
		username: '',
		setUsername: () => {
		},
		connections: [],
		openEvent: undefined,
		// peer: null,
		rooms: [],
		socket: null,
		createRoom: () => {
		},
		enterInRoom: () => {
		},
		sendData: sendData,
		getConnections: () => connections,
		disconnect: () => {
		},
		kick: () => {
		},
	},
);

const { setRoomPresence, setConnectedRoomName } = actions;

export const ConnectionProvider: FC<{ children: ReactNode, canvas: HTMLCanvasElement | null }> = ({
	children,
	canvas,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [username, setUsername] = useState('');
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
		if (socket.hasListeners('rooms')) return;

		socket.emit('subscribe');
		socket.on('rooms', (data: IRoom[]) => {
			console.log(data);
			setRooms(data);
		});
	};

	const makePeer = () => {
		dispatch(setRoomPresence(true));
		peer = new Peer({
			host: 'localhost',
			port: 3002,
		});
		return peer;
	};

	const createRoom = (room: IRoom, tool: IToolParam) => {
		const peer = makePeer();

		peer.on('open', (peerId: string) => {
			dispatch(setConnectedRoomName(room.name));
			room.users.push({ name: username, socketId: socket.id, peerId: peerId, roomRole: 'Host' });

			socket.emit('makeRoom', room);
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			dataConnection.on('open', () => {
				const save = canvas?.toDataURL();
				dataConnection.send({
					type: 'Canvas',
					data: save,
				} as PeerData);
			});

			dataConnection.on('data', dataEvent(canvas!, tool, disconnect));

			dataConnection.on('close', () => {
				console.log('[u] disconnect');
			});

			connections.push(dataConnection);
		});
	};

	const enterInRoom = (room: IRoom, tool: IToolParam) => {
		const peer = makePeer();

		peer.on('open', () => {
			dispatch(setConnectedRoomName(room.name));
			const user: IUser = { name: username, peerId: peer.id, roomRole: 'User', socketId: socket.id };
			socket.emit('enter', { roomName: room.name, user });

			for (const user of room.users) {
				const connection = peer.connect(user.peerId);
				connection.on('data', dataEvent(canvas!, tool, disconnect));

				connection.on('close', () => {
					if (user.roomRole === 'Host') {
						// peer.destroy();
						// connections.splice(0, connections.length);
						disconnect();
					}

					console.log('[x] disconnect');
				});

				connections.push(connection);
			}
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			dataConnection.on('data', dataEvent(canvas!, tool, disconnect));

			dataConnection.on('close', () => {
				console.log('[c] disconnect');
			});

			connections.push(dataConnection);
		});
	};

	const getConnections = () => connections;

	const disconnect = () => {
		dispatch(setRoomPresence(false));
		peer.destroy();
		connections.splice(0, connections.length);
	};

	const kick = (peerId: string) => {
		connections.find(x=>x.peer === peerId)?.send({
			type: 'Kick'
		} as PeerData)
	};

	return (
		<ConnectionContext.Provider value={{
			// peer,
			username,
			connections,
			socket,
			rooms,
			setUsername,
			openEvent,
			createRoom,
			enterInRoom,
			sendData,
			getConnections,
			disconnect,
			kick,
		}}>
			{children}
		</ConnectionContext.Provider>
	);
};