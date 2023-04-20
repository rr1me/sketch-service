import s from './Notifications.module.scss';
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import Notification from './Notification';

const { pushNotification, shiftNotification } = actions;

let prevCount = 0;

const Notifications: FC = () => {
	const [buffer, setBuffer] = useState<{ element: ReactElement, style: object }[]>([]);
	const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	const f = useRef(false);
	useEffect(() => {
		if (!f.current) {
			f.current = true;
			return;
		}

		if (notifications.length < prevCount) {
			setBuffer(v => {
				const slice = v.slice(1);
				if (notifications.length > 4) {
					setTimeout(() => dispatch(shiftNotification()), 5000);

					const style = {transform: 'hey'};

					slice.push({
						element: <Notification key={Math.random()} notification={notifications[slice.length]} style={style}/>,
						style
					});
				}
				return slice;
			});
		} else if (buffer.length < 5) {
			setBuffer(v => {
				setTimeout(() => dispatch(shiftNotification()), 5000);

				const style = {transform: 'hey'}

				return [...v,
					{
						element: <Notification key={Math.random()} notification={notifications[v.length]} style={style}/>,
						style
					}];
			});
			setTimeout(() => {
				setBuffer(v=>{
					const b = [...v];
					b[0].style = {transform: 'nothey'}
					// console.log(v[0].style);
					return b;
				})
			}, 100)
		}
		prevCount = notifications.length;

	}, [notifications]);

	return (
		<>
			{buffer.map(v => v.element)}
		</>
	);
};

export default Notifications;