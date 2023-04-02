import s from './EnterRoom.module.scss';
import React, { FC, useContext, useRef } from 'react';
import { IRoom } from '../../types';
import { ConnectionContext } from '../../ConnectionProvider';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useDispatch, useSelector } from 'react-redux';
import { actions, IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { AppDispatch } from '../../../../../redux/store';

const { setRoomName } = actions;

const EnterRoom: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { section, roomName } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const { rooms, enterInRoom } = useContext(ConnectionContext);
	// const [name, setName] = useState<string>(room?.name ?? '');
	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const onConnect = () => {
		const room = rooms.find(x=>x.name === roomName);

		if (room === undefined) {
			console.log('no such room');
			return;
		}

		if (room.isPrivate && room.password !== passRef.current?.value) {
			console.log('wrong password');
			return;
		}

		enterInRoom(room, tool);











		// let chosenRoom: IRoom;
		//
		// const roomName = nameRef.current?.value as string;

		// if (room === undefined){
		// 	const r = rooms.find(x=>x.name === roomName);
		// 	console.log(r);
		// 	if (r === undefined) return;
		// 	chosenRoom = r;
		// }else{
		// 	chosenRoom = room;
		// }

		// if (chosenRoom.isPrivate && chosenRoom.password !== passRef.current?.value) return; // todo throw error
		//
		// console.log(chosenRoom);

		// enterInRoom(chosenRoom, tool);

		// const roomObj = rooms.find(x=>x.name === roomName);

		// enterInRoom({...room, name: roomName as string}, tool)
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		dispatch(setRoomName(v));
		// setName(v ? v : '');
	};

	return (
		<>
			<input ref={nameRef}
				   value={roomName} onChange={onNameChange}
				   placeholder='Room name' />
			<input ref={passRef}
				// readOnly={room?.isPrivate}
				   placeholder='Password' />
			<button onClick={onConnect} className={s.createBtn}>Connect</button>
		</>
	);
};

export default EnterRoom;