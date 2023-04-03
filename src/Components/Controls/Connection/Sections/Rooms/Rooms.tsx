import s from './Rooms.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { FC, useContext } from 'react';
import { IRoom } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../redux/store';
import { actions } from '../../../../../redux/slices/connectionSlice';

const { setRoomName, setSection } = actions;

const Rooms: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { rooms } = useContext(ConnectionContext);

	const onChoosingRoom = (room: IRoom) => () => {
		dispatch(setRoomName(room.name));
		dispatch(setSection(2));
	};

	return (
		<>
			{
				rooms.map((v) =>
					// <div key={v.users[0].socketId} className={s.room} onClick={event(v)}>
					<div key={v.users[0].socketId} className={s.room} onClick={onChoosingRoom(v)}>
						<span>{v.name}</span>
						<div className={s.listEnd}>
							{v.isPrivate ? <span>{ic.locker}</span> : null}
							<span>{v.users.length}/{v.slots}</span>
						</div>
					</div>)
			}
		</>
	);
};

export default Rooms;