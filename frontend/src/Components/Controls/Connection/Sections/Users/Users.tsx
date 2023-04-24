import s from './Users.module.scss';
import ic from '../../../../Icons/Icons';
import { ConnectionContext } from '../../ConnectionProvider';
import { useContext } from 'react';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { useSelector } from 'react-redux';
import { notify } from '../../../../Notifications/NotificationManager';

const Users = () => {
	const { username, kick, amIHost } = useContext(ConnectionContext);
	const { room } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice); // roomName only for enterRoom element now

	const onUserKick = (peerId: string, name: string) => () => kick(peerId, name);

	return (
		<>
			{room?.users.map(x =>
				<div key={x.peerId} className={s.user}>
					<span>{x.name}</span>
					<div className={s.rowBlockEnd}>
						{(x.name !== username && amIHost) &&
							<button onClick={onUserKick(x.peerId, x.name)} className={s.userCtrlBtn}>{ic.kickUser}</button>}
						<span>{x.roomRole}</span>
					</div>
				</div>,
			)}
		</>
	);
};

export default Users;