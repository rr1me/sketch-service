import s from './Notifications.module.scss';
import React, { createRef, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, INotificationSlice } from '../../redux/slices/notificationSlice';
import { AppDispatch } from '../../redux/store';
import Notification from './Notification';
import AnimationNotification from './AnimationNotification';

const { pushNotification, shiftNotification } = actions;

let prevCount = 0;

const styles: any = [];

let test: any;

const Notifications: FC = () => {
	const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

	const ref = React.createRef();
	const [styles, setStyles] = useState<any>('who?');

	// const [buffer, setBuffer] = useState<{ element: ReactElement }[]>([]);
	const [buffer, setBuffer] = useState<{ v: string, k: any }[]>([]);
	const { notifications } = useSelector((state: { notificationSlice: INotificationSlice }) => state.notificationSlice);
	const dispatch = useDispatch<AppDispatch>();

	const styleRef = useRef({ hey: 'ebat;' });

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
					setTimeout(() => dispatch(shiftNotification()), 3300);

					// console.log(notifications[v.length]);
					slice.push(notifications[slice.length]);
				}
				return slice;
			});
		} else if (buffer.length < 5) {
			setBuffer(v => {
				setTimeout(() => dispatch(shiftNotification()), 3300);

				console.log('this one');
				return [...v, notifications[v.length]];
			});
		}

		// const notifiesAmount = notifications.length;
		// const bufferAmount = buffer.length;
		// console.log(bufferAmount, notifiesAmount);

		// if (notifiesAmount < prevCount) {
		// 	console.log('notifies decreasing');
		// 	setBuffer(v => {
				// prevCount = notifications.length;
			// 	return v.slice(1);
			// });
			// return;
		// }

		// if (bufferAmount === 5) {console.log('buffer fulfilled');return}

		// if (bufferAmount === notifiesAmount) {
		// 	console.log('notifies === buffer');
		// 	prevCount = notifications.length;
		// 	return;
		// }
		//
		// setBuffer(v => {
		//
		// 	return [...v, notifications[v.length]];
		// });
		//
		// setTimeout(() => {
		// 	dispatch(shiftNotification());
		// }, 3300);
		//
		prevCount = notifications.length;

	}, [notifications]);

	// console.log(test);

	return (
		<>
			<button onClick={() => {


				setStyles((v: any) => 'ебтваюматьблятьсука');

			}}>
				test
			</button>
			{/* {buffer.map(v => v.element)} */}
			<AnimationNotification>
				{buffer.map(v => {
					// console.log(v);
					const elem = <Notification key={v.k} notification={v.v} ref={createRef()} />;
					return elem;
				})}
			</AnimationNotification>
		</>
	);
};

export default Notifications;