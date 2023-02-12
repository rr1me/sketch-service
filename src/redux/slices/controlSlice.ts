import { createSlice } from '@reduxjs/toolkit';

export type brushType = 'Brush' | 'Square' | 'Circle'

export interface IControlState {
	history: {
		saves: { type: brushType, save: string }[],
		index: number
	},
	tool: {
		type: brushType
	};
}

const controlSlice = createSlice({
	name: 'controlSlice',
	initialState: {
		history: {
			saves: [],
			index: -1,
		},
		tool: {
			type: 'Brush',
		},
	} as IControlState,
	reducers: {
		save: ({ history }, { payload }) => {
			const saves = history.saves;
			const index = history.index;
			saves.length - 1 !== index && saves.splice(index + 1, saves.length);
			history.saves = history.saves.concat(payload);

			history.index = index + 1;
		},
		step: ({ history }, { payload }) => {
			history.index = history.index - payload;
		},
		move: ({ history }, { payload }) => {
			history.index = payload;
		},
		clear: ({ history }) => {
			history.saves = [];
			history.index = -1;
		},
		tool: ({ tool }, { payload }) => {
			tool.type = payload;
			console.log('q');
		},
	},
});

export default controlSlice.reducer;
export const actions = controlSlice.actions;