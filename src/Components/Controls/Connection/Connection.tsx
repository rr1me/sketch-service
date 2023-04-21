import s from './Connection.module.scss';
import MovingBlock from '../MovingBlock/MovingBlock';
import ic from '../../Icons/Icons';
import React, { FC, useContext, useRef } from 'react';
import Sections from './Sections/Sections';
import { ConnectionContext } from './ConnectionProvider';
import { actions, IConnectionSlice } from '../../../redux/slices/connectionSlice';
import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { actions as notificationActions, INotificationSlice } from '../../../redux/slices/notificationSlice';

const { setSection } = actions;
const { pushNotification } = notificationActions;

const Connection: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { section, inRoom } = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const { amIHost, openEvent, username, setUsername, disconnect } = useContext(ConnectionContext);
	const nameRef = useRef<HTMLInputElement>(null);

	const ctrlButtons = inRoom ? [
		ic.users,
		ic.roomSettings,
	] : [
		ic.list,
		ic.plus,
		ic.connect,
		ic.filter,
	];
	const ctrlButtonHandler = (section: number) => () => dispatch(setSection(section));

	const onNameApply = () => setUsername(nameRef.current?.value as string);

	const shouldISeeSettings = (index: number) => index === 1 && inRoom && !amIHost;

	const onNotificationPush = () => {
		dispatch(pushNotification('hey ' + Math.random() * 1000));
	}

	return (
		<MovingBlock name={ic.connection} side={'top'} outsideOffset={250} gap={10} locationOffsetSide={'right'}
					 locationOffset={10} openEvent={openEvent}>
			<div className={s.connection}>
				{username !== '' ?
					<>
						<div className={s.ctrl + (inRoom ? ' ' + s.rightToLeft : '')}>
							{inRoom && <button className={s.ctrlButton} onClick={disconnect}>{ic.exit}</button>}
							{ctrlButtons.map((v, i) =>
								<button key={i} onClick={shouldISeeSettings(i) ? undefined : ctrlButtonHandler(i)}
										className={s.ctrlButton + (i === section ? ' ' + s.iconUsing : '') + (shouldISeeSettings(i) ? ' ' + s.ctrlButtonReadonly : '')}>{v}</button>,
							)}
						</div>

						<Sections />
					</>
					:
					<div className={s.connList}>
						<span>Please enter your username</span>
						<input ref={nameRef} placeholder='Username' />
						<button onClick={onNameApply} className={s.applyBtn}>Apply</button>
						<button onClick={onNotificationPush}>push</button>
					</div>
				}
			</div>
		</MovingBlock>
	);
};

export default Connection;