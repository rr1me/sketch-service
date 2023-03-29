import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, useContext, useState } from 'react';
import Sections from './Sections/Sections';
import { ConnectionContext } from './ConnectionProvider';

const Connection: FC = () => {
	const { openEvent } = useContext(ConnectionContext);

	const [section, setSection] = useState(0);
	const ctrlButtons = [
		ic.list,
		ic.plus,
		ic.connect,
		ic.filter,
	];
	const ctrlButtonHandler = (section: number) => () => setSection(section);

	return (
		<MovingBlock name={ic.connection} side={'top'} outsideOffset={250} gap={10} locationOffsetSide={'right'}
					 locationOffset={10} openEvent={openEvent}>
			<div className={s.connection}>
				<div className={s.ctrl}>
					{ctrlButtons.map((v, i) =>
						<button key={i} onClick={ctrlButtonHandler(i)}
								className={s.ctrlButton + (i === section ? ' ' + s.iconUsing : '')}>{v}</button>,
					)}
				</div>

				<Sections section={section} />
			</div>
		</MovingBlock>
	);

};

export default Connection;