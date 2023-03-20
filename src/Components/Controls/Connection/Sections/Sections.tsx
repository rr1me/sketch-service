import ic from '../../../Icons/Icons';
import s from './Sections.module.scss';
import { FC, ReactElement } from 'react';
import Selector from '../../../Selector/Selector';

const Sections: FC<{ section: number, rooms: any[] }> = ({ section, rooms }) => {

	const onSlotsChange = (e:number) => {
		console.log(e);
	}

	let elem: ReactElement | ReactElement[] = <></>
	switch (section) {
	case 0:
		elem = rooms.map((v) =>
				<div key={v.users[0].socketId} className={s.room}>
					<span>{v.name}</span>
					<div className={s.listEnd}>
						{v.isPrivate ? <span>{ic.locker}</span> : null}
						<span>{v.users.length}/{v.slots}</span>
					</div>
				</div>,
			)
		break;
	case 1:
		elem = (
			<>
				<input placeholder='Name'/>
				<input placeholder='Password'/>
				<Selector options={['1', '2', '3']} value={0} onChange={onSlotsChange}/>
			</>
		)
		break;
	}


	return (
		<div className={s.connList}>
			{elem}
		</div>
	);
};

export default Sections;