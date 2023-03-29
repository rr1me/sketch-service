import Selector from '../../../../Selector/Selector';
import s from './CreateRoom.module.scss';
import { useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';
import { IRoom } from '../../types';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useSelector } from 'react-redux';
import Peer, { DataConnection } from 'peerjs';
import { dataEvent } from '../../ConnectionUtils';

let peer: Peer;
let connection: DataConnection;

const CreateRoom = () => {
	const { createRoom } = useContext(ConnectionContext);
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const [slots, setSlots] = useState(0);

	const onSlotsChange = (e: number) => setSlots(e);

	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	const onCreateRoom = () => {
		const name = nameRef.current!.value;
		const password = passRef.current!.value;

		const room: IRoom = {
			name: name,
			slots: Number(slotsOptions[slots]),
			isPrivate: false,
			password: password,
			users: [
				{ name: 'me', socketId: '', peerId: '', roomRole: 'Host' },
			],
		};

		createRoom(room, tool);
	};

	const makePeer = () => {
		peer = new Peer({
			host: 'localhost',
			port: 3002,
		});

		peer.on('open', (peerId: string) => {
			console.log(peerId);
		});

		// peer.on('connection', (data: any) => {
		// 	console.log(data);
		//
		// 	data.on('data', (data: any) => {
		// 		console.log(data);
		// 	});
		// });

		peer.on('connection', (data: any) => {
			console.log('HELP PLEASE');
			data.on('open', () => {
				console.log('??');
			});
		});
	};

	const connectToPeer = () => {
		// peer = new Peer({
		// 	host: 'localhost',
		// 	port: 3002,
		// });
		//
		// peer.on('open', (peerId: string) => {
		// 	console.log(peerId);
		// });
		//
		// peer.on('connection', (data: any) => {
		// 	console.log(data);
		//
		// 	data.on('data', (data: any) => {
		// 		console.log(data);
		// 	});
		// });

		const peerId = nameRef.current!.value;
		console.log(peerId);

		connection = peer.connect(peerId);
		console.log(connection);
		connection.send('hui');
	};

	return (
		<>
			<input placeholder='Name' ref={nameRef} />
			<input placeholder='Password' ref={passRef} />
			<Selector options={slotsOptions} value={slots} onChange={onSlotsChange} />
			<button className={s.createBtn} onClick={onCreateRoom}>Create</button>
			{/* <button onClick={makePeer}>peer</button> */}
			{/* <button onClick={connectToPeer}>connect</button> */}
			{/* <button onClick={() => { */}
			{/* 	peer.socket.emit('message', 'hui'); */}
			{/* 	peer.socket.close() */}
			{/* }}>send</button> */}
		</>
	);
};

export default CreateRoom;

const slotsOptions = ['1', '2', '3'];