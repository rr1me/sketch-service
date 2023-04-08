import Selector from '../../../../Selector/Selector';
import s from './CreateRoom.module.scss';
import React, { useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';
import { IRoom } from '../../types';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useSelector } from 'react-redux';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';

const CreateRoom = () => {
	const { rooms, createRoom, changeRoom } = useContext(ConnectionContext);
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const {
		inRoom,
		connectedRoomName,
	} = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	let connectedRoom: IRoom | undefined;
	if (inRoom) connectedRoom = rooms.find(x => x.name === connectedRoomName);
	console.log(connectedRoom);

	const [slots, setSlots] = useState(connectedRoom ? slotsOptions.indexOf(connectedRoom.slots + '') : 0);

	const onSlotsChange = (e: number) => setSlots(e);

	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const checkboxPassRef = useRef<HTMLInputElement>(null);

	const [isPassReadonly, setPassReadonly] = useState(!(connectedRoom && connectedRoom.password !== ''));
	const onPassCheckbox = () => setPassReadonly(!checkboxPassRef.current?.checked as boolean);

	const onCreateRoom = () => {
		const name = nameRef.current!.value;

		if (!connectedRoom && rooms.some(x => x.name === name)) {
			console.log('there is already the room with that name'); // todo error system
			return;
		}

		const password = passRef.current!.value;

		const room: IRoom = {
			name: name,
			slots: Number(slotsOptions[slots]),
			password: isPassReadonly ? '' : password,
			users: [],
		};

		connectedRoom ? changeRoom(room) : createRoom(room, tool);
	};

	return (
		<>
			<input placeholder='Name' ref={nameRef} defaultValue={connectedRoom ? connectedRoom.name : undefined} readOnly={!!connectedRoom} className={s.nameInput}/>
			<div className={s.passwordGroup}>
				<div className={s.checkboxWrapper}>
					<input type='checkbox' defaultChecked={!isPassReadonly} ref={checkboxPassRef} onClick={onPassCheckbox} className={s.checkBox} />
				</div>
				<input placeholder='Password' defaultValue={connectedRoom ? connectedRoom.password : undefined} ref={passRef} className={s.passwordInput} readOnly={isPassReadonly} />
			</div>
			<Selector options={slotsOptions} value={slots} onChange={onSlotsChange} />
			<button className={s.createBtn} onClick={onCreateRoom}>{inRoom ? 'Apply' : 'Create'}</button>
		</>
	);
};

export default CreateRoom;

const slotsOptions = ['2', '3', '4', '5'];