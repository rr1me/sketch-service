import s from './Sections.module.scss';
import { FC, ReactElement } from 'react';
import Rooms from './Rooms/Rooms';
import CreateRoom from './CreateRoom/CreateRoom';
import EnterRoom from './EnterRoom/EnterRoom';
import { useSelector } from 'react-redux';
import { IConnectionSlice } from '../../../../redux/slices/connectionSlice';
import Users from './Users/Users';
import Filters from './Filters/Filters';

const Sections: FC = () => {
	const { section, room } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	let elem: ReactElement = <></>;
	switch (section) {
	case 0:
		elem = room ? <Users/> : <Rooms />;
		break;
	case 1:
		elem = <CreateRoom />;
		break;
	case 2:
		elem = <EnterRoom />;
		break;
	case 3:
		elem = <Filters />
		break;
	}

	return (
		<div className={s.connList}>
			{elem}
		</div>
	);
};

export default Sections;