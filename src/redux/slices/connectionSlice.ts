import { createSlice } from '@reduxjs/toolkit';

export interface IConnectionSlice {
	inRoom: boolean;
	section: number;
	roomNameForExternalConnection: string;
	connectedRoomName: string;
}

const connectionSlice = createSlice({
	name: 'connectionSlice',
	initialState: {
		inRoom: false,
		section: 0,
		roomNameForExternalConnection: '',
		connectedRoomName: '',
	} as IConnectionSlice,
	reducers: {
		setSection: (state, { payload }) => {
			state.section = payload;
		},
		setRoomName: (state, { payload }) => {
			state.roomNameForExternalConnection = payload;
		},
		setConnectedRoomName: (state, { payload }) => {
			state.connectedRoomName = payload;
		},
		setRoomPresence: (state, { payload }) => {
			state.inRoom = payload;
			state.section = 0;
		},
	},
});

export default connectionSlice.reducer;
export const actions = connectionSlice.actions;