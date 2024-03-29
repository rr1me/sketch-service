import s from './EnterRoom.module.scss';
import React, { FC, useContext, useRef } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useDispatch, useSelector } from 'react-redux';
import { actions, IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { AppDispatch } from '../../../../../redux/store';
import { notify } from '../../../../Notifications/NotificationManager';

const { setRoomName } = actions;

const EnterRoom: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { roomNameForExternalConnection } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const { rooms, enterInRoom } = useContext(ConnectionContext);
	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const onConnect = () => {
		const room = rooms.find(x => x.name === roomNameForExternalConnection);

		if (room === undefined) {
			notify('No such room with this name', '#ff0000');
			return;
		}

		console.log(room.users.length, room.slots);
		if (room.users.length >= room.slots){
			notify('Room is fulfilled', '#ff0000')
			return;
		}

		if (room.password !== '' && room.password !== passRef.current?.value) {
			notify('Wrong password', '#ff0000');
			return;
		}

		console.log(room);

		enterInRoom(room, tool);
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		dispatch(setRoomName(v));
	};

	return (
		<>
			<input ref={nameRef}
				   value={roomNameForExternalConnection} onChange={onNameChange}
				   placeholder='Room name' />
			<input ref={passRef}
				   placeholder='Password' />
			<button onClick={onConnect} className={s.createBtn}>Connect</button>
		</>
	);
};

export default EnterRoom;