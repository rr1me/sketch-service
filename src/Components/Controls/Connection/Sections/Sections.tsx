import s from './Sections.module.scss';
import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';
import Rooms from './Rooms/Rooms';
import CreateRoom from './CreateRoom/CreateRoom';
import EnterRoom from './EnterRoom/EnterRoom';
import { IRoom } from '../types';
import { IBaseBrushSlice } from '../../../../redux/slices/baseBrushSlice';
import { useSelector } from 'react-redux';
import { IConnectionSlice } from '../../../../redux/slices/connectionSlice';

const Sections: FC = () => {
	const {section} = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);
	// const [room, setRoom] = useState<IRoom>({ isPrivate: false, name: '', password: '', slots: 0, users: [] });

	// const onChoosingRoom = (room: IRoom) => () => {
	// 	setRoom(room)
	// 	setSection(2);
	// };

	let elem: ReactElement = <></>;
	switch (section) {
	case 0:
		elem = <Rooms />;
		break;
	case 1:
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