import Selector from '../../../../Selector/Selector';
import s from './CreateRoom.module.scss';
import { useContext, useRef, useState } from 'react';
import { ConnectionContext } from '../../ConnectionProvider';

const CreateRoom = () => {
	const {peer, socket, makePeer} = useContext(ConnectionContext)

	const [slots, setSlots] = useState(0)

	const onSlotsChange = (e:number) => setSlots(e)

	const nameRef = useRef<HTMLInputElement>(null)
	const passRef = useRef<HTMLInputElement>(null)

	const onCreateRoom = () => {
		makePeer();
		console.log(peer);

		const name = nameRef.current?.value;
		const password = passRef.current?.value;

		console.log(name, password);
		socket?.emit('makeRoom', {
			name: name,
			slots: Number(slotsOptions[slots]),
			isPrivate: false,
			password: password,
			users: [
				{name: 'me', socketId: socket.id, peerId: peer?.id, roomRole: 'Host'}
			]
		})
	}

	return (
		<>
			<input placeholder='Name' ref={nameRef}/>
			<input placeholder='Password' ref={passRef}/>
			<Selector options={slotsOptions} value={slots} onChange={onSlotsChange}/>
			<button className={s.createBtn} onClick={onCreateRoom}>Create</button>
		</>
	)
};

const slotsOptions = ['1', '2', '3'];

export default CreateRoom;