import store from '../../redux/store';
import { actions } from '../../redux/slices/notificationSlice';

const { pushNotification } = actions;

export const notify = (msg: string, color?: string) => store.dispatch(pushNotification({
	v: msg,
	color: color,
}));