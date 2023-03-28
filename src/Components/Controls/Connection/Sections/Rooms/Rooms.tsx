import s from './Rooms.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { FC, useContext } from 'react';

const Rooms: FC = () => {
	const {rooms} = useContext(ConnectionContext)

	const onEnterRoom = () => {
		console.log('trying enter');
	}

	return (
		<>
			{
				rooms.map((v) =>
					<div key={v.users[0].socketId} className={s.room} onClick={onEnterRoom}>
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