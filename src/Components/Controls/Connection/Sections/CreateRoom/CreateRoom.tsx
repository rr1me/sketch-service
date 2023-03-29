import Selector from '../../../../Selector/Selector';
import s from './CreateRoom.module.scss';
import { useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';
import { IRoom } from '../../types';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useSelector } from 'react-redux';

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

	return (
		<>
			<input placeholder='Name' ref={nameRef} />
			<input placeholder='Password' ref={passRef} />
			<Selector options={slotsOptions} value={slots} onChange={onSlotsChange} />
			<button className={s.createBtn} onClick={onCreateRoom}>Create</button>
		</>
	);
};

export default CreateRoom;

const slotsOptions = ['1', '2', '3'];