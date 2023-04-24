import { createSlice, current } from '@reduxjs/toolkit';

export type notificationType = {
	v: string;
	color: string | undefined;
	k: number
}

export interface INotificationSlice {
	notifications: notificationType[];
}

const notificationSlice = createSlice({
	name: 'notificationSlice',
	initialState: {
		notifications: [],
	} as INotificationSlice,
	reducers: {
		pushNotification: (state, { payload }: { payload: { v: string, color: string | undefined } }) => {
			const { v, color } = payload;
			state.notifications.push({ v, color, k: Math.random() });
		},
		shiftNotification: (state) => {
			state.notifications.shift();
			// console.log(current(state));
		},
	},
});

export default notificationSlice.reducer;
export const actions = notificationSlice.actions;