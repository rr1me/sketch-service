import s from './Users.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { useContext } from 'react';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { useSelector } from 'react-redux';

const Users = () => {
	const { rooms, username, kick } = useContext(ConnectionContext);
	const { connectedRoomName } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice); // roomName only for enterRoom element now

	const onUserKick = (peerId: string) => () => {
		console.log('kicking');
		kick(peerId)
	}

	const room = rooms.find(x => x.name === connectedRoomName);

	const isImHost = room?.users.find(x=>x.name === username)?.roomRole === 'Host'

	return (
		<>
			{room?.users.map(x =>
				<div key={x.peerId} className={s.user}>
					<span>{x.name}</span>
					<div className={s.rowBlockEnd}>
						{(x.name !== username && isImHost) && <button onClick={onUserKick(x.peerId)}>{ic.kickUser}</button>}
						<span>{x.roomRole}</span>
					</div>
				</div>,
			)}
		</>
	);
};

export default Users;