import { createSlice } from '@reduxjs/toolkit';

export interface IConnectionSlice {
	inRoom: boolean;
	section: number;
	roomName: string;
}

const connectionSlice = createSlice({
	name: 'connectionSlice',
	initialState: {
		inRoom: false,
		section: 0,
		roomName: '',
	} as IConnectionSlice,
	reducers: {
		setSection: (state, { payload }) => {
			console.log(payload);
			state.section = payload;
		},
		setRoomName: (state, { payload }) => {
			console.log(payload);
			state.roomName = payload;
		},
		setRoomPresence: (state, { payload }) => {
			console.log(payload);
			state.inRoom = payload;
			state.section = 0;
		},
	},
});

export default connectionSlice.reducer;
export const actions = connectionSlice.actions;