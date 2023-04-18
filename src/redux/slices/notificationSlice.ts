import { createSlice, current } from '@reduxjs/toolkit';

export interface INotificationSlice {
	notifications: string[];
}

const notificationSlice = createSlice({
	name: 'notificationSlice',
	initialState: {
		notifications: [],
	} as INotificationSlice,
	reducers: {
		pushNotification: (state, { payload }) => {
			state.notifications.push(payload);
		},
		popNotification: (state) => {
			state.notifications.pop();
		}
	},
});

export default notificationSlice.reducer;
export const actions = notificationSlice.actions;