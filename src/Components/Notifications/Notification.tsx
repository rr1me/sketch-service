import { FC, useEffect, useState } from 'react';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const { popNotification } = actions;

const Notification: FC<{ notification: string }> = ({ notification }) => {
	const [style, setStyle] = useState<object | undefined>({ transform: 'translateX(-220%)' });
	// const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		setStyle({ transform: 'translateX(0)' });
		setTimeout(() => {
			setStyle({ transform: 'translateX(-220%)' });
			setTimeout(() => dispatch(popNotification()), 300);
		}, 1500);
	});

	return (
		<div>

		</div>
	);
};

export default Notification;