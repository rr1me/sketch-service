import s from './Sections.module.scss';
import { FC, ReactElement } from 'react';
import Rooms from './Rooms/Rooms';
import CreateRoom from './CreateRoom/CreateRoom';
import EnterRoom from './EnterRoom/EnterRoom';
import { useSelector } from 'react-redux';
import { IConnectionSlice } from '../../../../redux/slices/connectionSlice';
import Users from './Users/Users';

const Sections: FC = () => {
	const { section, inRoom } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	let elem: ReactElement = <></>;
	switch (section) {
	case 0:
		elem = inRoom ? <Users/> : <Rooms />;
		break;
	case 1:
		// elem = inRoom ? <></> : <CreateRoom />;
		elem = <CreateRoom />;
		break;
	case 2:
		elem = <EnterRoom />;
		break;
	}

	return (
		<div className={s.connList}>
			{elem}
		</div>
	);
};

export default Sections;