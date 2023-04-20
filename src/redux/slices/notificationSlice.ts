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
		shiftNotification: (state) => {
			state.notifications.shift();
			console.log(current(state));
		}
	},
});

export default notificationSlice.reducer;
export const actions = notificationSlice.actions;