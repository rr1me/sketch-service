import s from './Users.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { useContext } from 'react';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { useSelector } from 'react-redux';

const Users = () => {
	const { rooms, username, kick, amIHost } = useContext(ConnectionContext);
	const { connectedRoomName } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice); // roomName only for enterRoom element now

	const onUserKick = (peerId: string) => () => kick(peerId);

	const room = rooms.find(x => x.name === connectedRoomName);

	return (
		<>
			{room?.users.map(x =>
				<div key={x.peerId} className={s.user}>
					<span>{x.name}</span>
					<div className={s.rowBlockEnd}>
						{(x.name !== username && amIHost) &&
							<button onClick={onUserKick(x.peerId)} className={s.userCtrlBtn}>{ic.kickUser}</button>}
						<span>{x.roomRole}</span>
					</div>
				</div>,
			)}
		</>
	);
};

export default Users;