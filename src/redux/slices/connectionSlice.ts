import { createSlice } from '@reduxjs/toolkit';
import { IRoom } from '../../Components/Controls/Connection/types';

export type RoomFilters = {
	unfilled: boolean;
	noPassword: boolean;
}

export interface IConnectionSlice {
	// inRoom: boolean;
	section: number;
	roomNameForExternalConnection: string;
	connectedRoomName: string;
	filters: {
		unfilled: boolean,
		noPassword: boolean
	},
	room: null | IRoom;
}

const connectionSlice = createSlice({
	name: 'connectionSlice',
	initialState: {
		// inRoom: false,
		section: 0,
		roomNameForExternalConnection: '',
		connectedRoomName: '',
		filters: {
			unfilled: false,
			noPassword: false,
		},
		room: null,
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
		setFilter: (state, { payload }: { payload: { filter: keyof RoomFilters } }) => {
			const { filter } = payload;
			state.filters[filter] = !state.filters[filter];
		},
		setConnectedRoom: (state, { payload }: {payload: null | IRoom[]}) => {
			if (payload === null) state.room = null
			else state.room = payload.find(x=>x.name === state.connectedRoomName)!;
		},
	},
});

export default connectionSlice.reducer;
export const actions = connectionSlice.actions;