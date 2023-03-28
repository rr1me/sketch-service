import s from './Sections.module.scss';
import { FC, ReactElement } from 'react';
import Rooms from './Rooms/Rooms';
import CreateRoom from './CreateRoom/CreateRoom';

const Sections: FC<{ section: number }> = ({ section }) => {

	let elem: ReactElement = <></>
	switch (section) {
	case 0:
		elem = <Rooms/>
		break;
	case 1:
		elem = <CreateRoom/>
		break;
	}

	return (
		<div className={s.connList}>
			{elem}
		</div>
	);
};

export default Sections;