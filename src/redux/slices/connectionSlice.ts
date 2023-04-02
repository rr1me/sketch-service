import { createSlice } from '@reduxjs/toolkit';

export interface IConnectionSlice {
	section: number;
	roomName: string;
}

const connectionSlice = createSlice({
	name: 'connectionSlice',
	initialState: {
		section: 0,
		roomName: '',
	} as IConnectionSlice,
	reducers: {
		setSection: (state, { payload }) => {
			state.section = payload;
		},
		setRoomName: (state, { payload }) => {
			console.log(payload);
			state.roomName = payload;
		},
	},
});

export default connectionSlice.reducer;
export const actions = connectionSlice.actions;