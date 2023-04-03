import s from './Users.module.scss';
import { ConnectionContext } from '../../ConnectionProvider';
import { useContext } from 'react';
import { IConnectionSlice } from '../../../../../redux/slices/connectionSlice';
import { useSelector } from 'react-redux';

const Users = () => {
	const { rooms } = useContext(ConnectionContext);
	const { roomName } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice); // roomName only for enterRoom element now

	console.log(rooms, roomName);

	return (
		<>
			<div>{rooms.find(x=>x.name === roomName)?.users.map(x=>{
				console.log(rooms);
				return (

					<div key={x.peerId}>
						{x.name}
					</div>
				)
				}
			)}</div>
		</>
	)
};

export default Users;