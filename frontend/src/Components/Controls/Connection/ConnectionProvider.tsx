import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';
import { IRoom, IUser, PeerData } from './types';
import { IToolParam } from '../../../redux/slices/controlSlice';
import { clearHistory, dataEvent, getUser } from './ConnectionUtils';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '../../../redux/store';
import { actions } from '../../../redux/slices/connectionSlice';
import { notify } from '../../Notifications/NotificationManager';
import rooms from './Sections/Rooms/Rooms';

let disconnecting = false;

let socket: Socket;
let peer: Peer;
const connections: DataConnection[] = [];
let amIHost: boolean;

const sendData = (data: PeerData) => connections.forEach(v => v.send(data));

export const ConnectionContext = createContext<{
	amIHost: boolean,
	username: string,
	setUsername: Dispatch<SetStateAction<string>>
	connections: DataConnection[],
	socket: Socket | null, rooms: IRoom[],
	openEvent: (() => void) | undefined,
	createRoom: (room: IRoom, tool: IToolParam) => void,
	enterInRoom: (room: IRoom, tool: IToolParam) => void,
	sendData: (data: PeerData) => void,
	disconnect: () => void,
	kick: (peerId: string, name: string) => void,
	changeRoom: (room: IRoom) => void,
	clearCanvas: () => void
}>({
		amIHost: false,
		username: '',
		setUsername: () => {
		},
		connections: [],
		openEvent: undefined,
		rooms: [],
		socket: null,
		createRoom: () => {
		},
		enterInRoom: () => {
		},
		sendData: sendData,
		disconnect: () => {
		},
		kick: () => {
		},
		changeRoom: () => {
		},
		clearCanvas: () => {
		},
	},
);

const { setConnectedRoomName, setConnectedRoom } = actions;

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
			setRooms(data);
			if (peer && !peer.destroyed) dispatch(setConnectedRoom(data));
		});
	};

	const makePeer = () => {
		peer = new Peer({
			host: 'localhost',
			port: 3002,
		});
		clearHistory();
		return peer;
	};

	const createRoom = (room: IRoom, tool: IToolParam) => {
		if (peer && !peer.destroyed) return;
		makePeer();
		amIHost = true;

		peer.on('open', (peerId: string) => {
			dispatch(setConnectedRoomName(room.name));
			room.users.push({ name: username, socketId: socket.id, peerId: peerId, roomRole: 'Host' });

			socket.emit('makeRoom', room);

			notify('Room successfully created');
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			const user = getUser(dataConnection.peer);

			dataConnection.on('open', () => {
				const save = canvas?.toDataURL();
				dataConnection.send({
					type: 'Canvas',
					body: save,
				} as PeerData);

				notify(user.name + ' connected');
			});

			dataConnection.on('data', dataEvent(canvas!, tool, disconnect, dataConnection));

			dataConnection.on('close', () => {
				if (!amIHost) notify(user.name + ' disconnected', '#0000ff');

				console.log('[u] disconnect');
			});

			connections.push(dataConnection);
		});
	};

	const enterInRoom = (room: IRoom, tool: IToolParam) => {
		if (peer && !peer.destroyed) return;
		makePeer();
		amIHost = false;

		peer.on('open', () => {
			dispatch(setConnectedRoomName(room.name));
			const user: IUser = { name: username, peerId: peer.id, roomRole: 'User', socketId: socket.id };
			socket.emit('enter', { roomName: room.name, user });

			for (const user of room.users) {
				const connection = peer.connect(user.peerId);
				connection.on('data', dataEvent(canvas!, tool, disconnect, connection));

				connection.on('close', () => {
					if (disconnecting) return;

					if (user.roomRole === 'Host') {
						notify('Host disconnected', '#ff0000');
						disconnect();
						return;
					}

					notify(user.name + ' disconnected');
					console.log('[x] disconnect');
				});

				connections.push(connection);
			}
		});

		peer.on('connection', (dataConnection: DataConnection) => {
			const name = getUser(dataConnection.peer).name;
			notify(name + ' connected');
			dataConnection.on('data', dataEvent(canvas!, tool, disconnect, dataConnection));

			dataConnection.on('close', () => {
				notify(name + ' disconnected');
				console.log('[c] disconnect');
			});

			connections.push(dataConnection);
		});
		notify('You successfully entered in room');
	};

	const disconnect = () => {
		disconnecting = true;
		peer.destroy();
		connections.splice(0, connections.length);
		canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

		dispatch(setConnectedRoom(null));

		if (amIHost) notify('Room closed');
		disconnecting = false;
	};

	const kick = (peerId: string, name: string) => {
		connections.find(x => x.peer === peerId)?.send({ type: 'Kick' } as PeerData);
		notify(name + ' kicked');
	};

	const changeRoom = (room: IRoom) => {
		socket.emit('changeRoom', room);
		notify('Settings changed');
	};

	const clearCanvas = () => sendData({ type: 'Clear' });

	return (
		<ConnectionContext.Provider value={{
			amIHost,
			username,
			connections,
			socket,
			rooms,
			setUsername,
			openEvent,
			createRoom,
			enterInRoom,
			sendData,
			disconnect,
			kick,
			changeRoom,
			clearCanvas,
		}}>
			{children}
		</ConnectionContext.Provider>
	);
};