import s from './Notifications.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';

const { pushNotification, popNotification } = actions;

// let prevCount = 0;

const Notifications: FC = () => {
	const [style, setStyle] = useState<object | undefined>({
		// transform: 'translateX(-220%)',
		// height: '33px'
	});
	const [wrapperStyle, setWrapperStyle] = useState({height: 150});

	const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	const f = useRef(false);
	useEffect(() => {
		// if (!f.current) {
		// 	f.current = true;
		// 	return;
		// }
		//
		// if (notifications.length < prevCount){
		// 	prevCount = notifications.length;
		// 	return;
		// }
		// prevCount = notifications.length;

		console.log(notifications);
		// setStyle({transform: 'translateX(0)' });
		setTimeout(() => {
			// setStyle({ transform: 'translateX(-220%)' });
			setWrapperStyle({ height: wrapperStyle.height + 33 });
			console.log('hey?');
			// setTimeout(() => dispatch(popNotification()), 300);
		}, 3000);
	}, [notifications]);

	const notify = () => {

	}

	return (
		<div className={s.wrapper}
			 style={wrapperStyle}
		>
			<div className={s.notification}
				 // style={style}
			>
				<div className={s.tab} />
				<div className={s.inner}>
					{notifications[0]}
				</div>
			</div>
		</div>
	);
};

export default Notifications;