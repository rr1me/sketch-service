import s from './Notifications.module.scss';
import { FC, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const { shiftNotification } = actions;

type styleObject = {
	transform: string
}

// eslint-disable-next-line react/prop-types,react/display-name
const Notification = forwardRef(({ notification }: {notification: string}, ref: ForwardedRef<HTMLDivElement>) => {
	// const ref = useRef<HTMLDivElement>(null);
	const [style, setStyle] = useState<styleObject>({ transform: 'translateX(-200%)' });
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// setTimeout(() => setStyle({ transform: 'translateX(0%)' }), 50)

		// setTimeout(() => moveAbove(150), 500)
		//
		// setTimeout(() => setStyle(v=>{
		// 	console.log(v.transform.split(' ')[1]);
		// 	return {...v, transform: 'translateX(-200%) ' + v.transform.split(' ')[1]}
		// }), 4700);

	}, []);

	// useEffect(() => {
	// 	console.log(test);
	// }, [test])
	//
	// console.log(test);

	// const moveAbove = (height: number) => {
	// 	setStyle(v=>{
	// 		return {...v, transform: v.transform + ' translateY(-' + height + 'px)'}
	// 	})
	// }

	return (
		<div className={s.notification}
			 // style={style}
			 ref={ref}
		>
			<button onClick={() => {
				console.log(test);}}>chec</button>
			<div className={s.tab} />
			<div className={s.inner}>
				{notification}
			</div>
		</div>
	);
})

export default Notification;