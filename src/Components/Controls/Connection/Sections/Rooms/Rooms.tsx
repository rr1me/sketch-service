import s from './Rooms.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { FC, useContext } from 'react';
import { IRoom } from '../../types';
import { IControlState } from '../../../../../redux/slices/controlSlice';
import { useSelector } from 'react-redux';

const Rooms: FC = () => {
	const {rooms, connectToPeer} = useContext(ConnectionContext)
	const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const onEnterRoom = (room: IRoom) => () => {
		console.log('trying enter');

		connectToPeer(room.users[0].peerId, tool)
	}

	return (
		<>
			{
				rooms.map((v) =>
					<div key={v.users[0].socketId} className={s.room} onClick={onEnterRoom(v)}>
						<span>{v.name}</span>
						<div className={s.listEnd}>
							{v.isPrivate ? <span>{ic.locker}</span> : null}
							<span>{v.users.length}/{v.slots}</span>
						</div>
					</div>)
			}
		</>
	)
};

export default Rooms;