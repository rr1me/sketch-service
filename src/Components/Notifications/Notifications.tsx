import s from './Notifications.module.scss';
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import Notification from './Notification';

const { pushNotification, shiftNotification } = actions;

let prevCount = 0;

const Notifications: FC = () => {
	const [buffer, setBuffer] = useState<{ element: ReactElement }[]>([]);
	const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	const f = useRef(false);
	useEffect(() => {
		if (notifications.length > 0) return;
		if (!f.current) {
			f.current = true;
			return;
		}

		const reveal = () => {
			setBuffer(v => {

				setTimeout(() => {
					dispatch(shiftNotification());
				}, 5000);

				return [...v, {
					element: <Notification key={Math.random()}
										   notification={notifications[v.length] + Math.random()} />,
				}];
			});
		};

		if (notifications.length < prevCount) {
			prevCount = notifications.length;
			setBuffer(v => {
				const splice = v.slice(1);

				if (notifications.length > 4){
					splice.push({
						element: <Notification key={Math.random()}
											   notification={notifications[splice.length] + Math.random()} />,
					})
					setTimeout(() => {
						dispatch(shiftNotification());
					}, 5000);
				}
				return splice
			});

			return;
		}

		prevCount = notifications.length;

		if (buffer.length === 5) {
			console.log('buffer fulfilled');
			return;
		}

		reveal();

	}, [notifications]);

	return (
		<div className={s.wrapper}>
			{buffer.map(v => v.element)}
		</div>
	);
};

export default Notifications;

const delay = async (delay: number) => new Promise(resolve => {
	setTimeout(() => {
		resolve('');
	}, delay);
});