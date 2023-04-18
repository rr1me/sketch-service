import { createSlice } from '@reduxjs/toolkit';

export type RoomFilters = {
	unfilled: boolean;
	noPassword: boolean;
}

export interface IConnectionSlice {
	inRoom: boolean;
	section: number;
	roomNameForExternalConnection: string;
	connectedRoomName: string;
	filters: {
		unfilled: boolean,
		noPassword: boolean
	};
}

const connectionSlice = createSlice({
	name: 'connectionSlice',
	initialState: {
		inRoom: false,
		section: 0,
		roomNameForExternalConnection: '',
		connectedRoomName: '',
		filters: {
			unfilled: false,
			noPassword: false,
		},
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
		setFilter: (state, { payload }: { payload: { filter: keyof RoomFilters } }) => {
			const { filter } = payload;
			state.filters[filter] = !state.filters[filter];
		},
	},
});

export default connectionSlice.reducer;
export const actions = connectionSlice.actions;