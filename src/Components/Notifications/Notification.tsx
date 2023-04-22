import s from './Notifications.module.scss';
import { ForwardedRef, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Notification = forwardRef(({ notification, color = '#00ff00' }: { notification: string, color?: string }, ref: ForwardedRef<HTMLDivElement>) => {

	return (
		<div className={s.notification} ref={ref}>
			<div className={s.tab} style={{backgroundColor: color}}/>
			<div className={s.inner}>
				{notification}
			</div>
		</div>
	);
});

export default Notification;