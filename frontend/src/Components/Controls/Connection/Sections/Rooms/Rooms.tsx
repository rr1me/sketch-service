import s from './Rooms.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { FC, useContext } from 'react';
import { IRoom } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../redux/store';
import { actions, IConnectionSlice } from '../../../../../redux/slices/connectionSlice';

const { setRoomName, setSection } = actions;

const Rooms: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { rooms } = useContext(ConnectionContext);
	const {
		filters: {
			unfilled,
			noPassword,
		},
	} = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const onChoosingRoom = (room: IRoom) => () => {
		dispatch(setRoomName(room.name));
		dispatch(setSection(2));
	};

	const getTransformedRooms = () => {
		let tRooms: IRoom[] = rooms;
		if (unfilled) tRooms = tRooms.filter(v => v.users.length < v.slots);
		if (noPassword) tRooms = tRooms.filter(v => v.password === '');

		if (tRooms.length === 0)
			return <span>No rooms for now )=</span>

		return rooms.map((v) =>
			<div key={v.users[0].socketId} className={s.room} onClick={onChoosingRoom(v)}>
				<span>{v.name}</span>
				<div className={s.rowBlockEnd}>
					{v.password !== '' ? <span>{ic.locker}</span> : null}
					<span>{v.users.length}/{v.slots}</span>
				</div>
			</div>);
	};

	return (
		<>
			{
				getTransformedRooms()
			}
		</>
	);
};

export default Rooms;