import React, { createRef, FC, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, INotificationSlice, notificationType } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import Notification from './Notification';
import AnimationNotification from './AnimationNotification';

const { shiftNotification } = actions;

let prevCount = 0;

const Notifications: FC = () => { // todo should i fix double renders?

	const [buffer, setBuffer] = useState<notificationType[]>([]);
	const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	const f = useRef(false);
	useLayoutEffect(() => {
		if (!f.current) {
			f.current = true;
			return;
		}
		console.log(notifications);

		if (notifications.length < prevCount) { // todo it cant handle adding more than 1 notification. i should check if prevCount less than two or more and use loops
			setBuffer(v => {
				const slice = v.slice(1);
				if (notifications.length > 4) {
					setTimeout(() => dispatch(shiftNotification()), 3300);

					slice.push(notifications[slice.length]);
				}
				return slice;
			});
		} else if (buffer.length < 5 && notifications.length > 0) {
			setBuffer(v => {
				setTimeout(() => dispatch(shiftNotification()), 3300);

				return [...v, notifications[v.length]];
			});
		}

		prevCount = notifications.length;

	}, [notifications]);

	return (
		<>
			<AnimationNotification>
				{buffer.map(v => <Notification key={v.k} notification={v.v} ref={createRef()} color={v.color}/>)}
			</AnimationNotification>
		</>
	);
};

export default Notifications;