import { createSlice, current } from '@reduxjs/toolkit';

export interface IControlState {
	history: {
		saves: string[],
		index: number
	};
}

const controlSlice = createSlice({
	name: 'controlSlice',
	initialState: {
		history: {
			saves: [] as string[],
			index: -1 as number,
		},
	} as IControlState,
	reducers: {
		save: ({ history }, { payload }) => {
			const saves = history.saves;
			const index = history.index;
			saves.length - 1 !== index && saves.splice(index + 1, saves.length);
			history.saves = history.saves.concat(payload);

			history.index = index + 1;
			console.log(current(history));
		},
		step: ({ history }, { payload }) => {
			history.index = history.index - payload;
		},
		move: ({ history }, { payload }) => {
			history.index = payload
		},
		clear: ({ history }) => {
			history.saves = [];
			history.index = -1;
		},
	},
});

export default controlSlice.reducer;
export const actions = controlSlice.actions;