import s from './Notifications.module.scss';
import { FC, useEffect, useState } from 'react';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const { shiftNotification } = actions;

type styleObject = {
	transform: string
}

const Notification: FC<{ notification: string, style: object }> = ({ notification,style:test}) => {
	const [style, setStyle] = useState<styleObject>({ transform: 'translateX(-200%)' });
	const dispatch = useDispatch<AppDispatch>();

	// useEffect(() => {
	// 	setTimeout(() => setStyle({ transform: 'translateX(0%)' }), 50)
	//
	// 	setTimeout(() => moveAbove(150), 500)
	//
	// 	setTimeout(() => setStyle(v=>{
	// 		console.log(v.transform.split(' ')[1]);
	// 		return {transform: 'translateX(-200%) ' + v.transform.split(' ')[1]}
	// 	}), 4700);
	//
	// }, []);

	const moveAbove = (height: number) => {
		setStyle(v=>{
			return {transform: v.transform + ' translateY(-' + height + 'px)'}
		})
	}

	console.log(test);

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