import Selector from '../../../../Selector/Selector';
import s from './CreateRoom.module.scss';
import React, { useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';
import { IRoom } from '../../types';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useSelector } from 'react-redux';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { notify } from '../../../../Notifications/NotificationManager';

const CreateRoom = () => {
	const { rooms, createRoom, changeRoom } = useContext(ConnectionContext);
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const {
		room
	} = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const [slots, setSlots] = useState(room ? slotsOptions.indexOf(room.slots + '') : 0);

	const onSlotsChange = (e: number) => setSlots(e);

	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const checkboxPassRef = useRef<HTMLInputElement>(null);

	const [isPassReadonly, setPassReadonly] = useState(!(room && room.password !== ''));
	const onPassCheckbox = () => setPassReadonly(!checkboxPassRef.current?.checked as boolean);

	const onCreateRoom = () => {
		const name = nameRef.current!.value;

		if (!room && rooms.some(x => x.name === name)) {
			notify('There is already the room with that name', '#ff0000')
			return;
		}

		const password = passRef.current!.value;

		const newRoom: IRoom = {
			name: name,
			slots: Number(slotsOptions[slots]),
			password: isPassReadonly ? '' : password,
			users: [],
		};

		room ? changeRoom(newRoom) : createRoom(newRoom, tool);
	};

	return (
		<>
			<input placeholder='Name' ref={nameRef} defaultValue={room ? room.name : undefined}
				   readOnly={!!room} className={s.nameInput} />
			<div className={s.passwordGroup}>
				<div className={s.checkboxWrapper}>
					<input type='checkbox' defaultChecked={!isPassReadonly} ref={checkboxPassRef}
						   onClick={onPassCheckbox} className={s.checkBox} />
				</div>
				<input placeholder='Password' defaultValue={room ? room.password : undefined}
					   ref={passRef} className={s.passwordInput} readOnly={isPassReadonly} />
			</div>
			<Selector options={slotsOptions} value={slots} onChange={onSlotsChange} />
			<button className={s.createBtn} onClick={onCreateRoom}>{room ? 'Apply' : 'Create'}</button>
		</>
	);
};

export default CreateRoom;

const slotsOptions = ['2', '3', '4', '5'];