import s from './Notifications.module.scss';
import { FC, useEffect, useState } from 'react';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const { shiftNotification } = actions;

const Notification: FC<{ notification: string }> = ({ notification }) => {
	const [style, setStyle] = useState<object | undefined>({ transform: 'translateY(0%)' });
	// const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// setStyle({ transform: 'translateX(0)' });
		// setTimeout(() => {
			// setStyle({ transform: 'translateY(-220%)' });
			// setTimeout(() => dispatch(popNotification()), 3000);
		// }, 1500);
		// setTimeout(() => {
		// 	dispatch(popNotification());
		// 	console.log('dispatch');
		// }, 5000);
	}, []);

	return (
		<div className={s.notification}
			style={style}
		>
			<div className={s.tab} />
			<div className={s.inner}>
				{notification}
			</div>
		</div>
	);
};

export default Notification;