import { createSlice, current } from '@reduxjs/toolkit';


export type brushType = 'Brush' | 'Square' | 'Circle' | 'Line' | 'Rectangle' | 'Fill'

export interface IBrush {
	width: number
}

type paramsType = IBrush;

export interface IToolParam {
	type: brushType,
	color: string,
	params: paramsType
}

export interface IControlState {
	history: {
		saves: { type: brushType, save: string }[],
		index: number
	},
	tool: IToolParam;
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
			color: '#000000',
			params: {
				width: 15,

			},
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
		},
		param: ({ tool }, { payload }: { payload: [keyof IToolParam, any] }) => {
			tool[payload[0]] = payload[1];
		},
		toolParam: ({ tool: { params } }, { payload }: { payload: {param: keyof paramsType, value: any} }) => {
			const {param, value} = payload;
			params[param] = value;
		},
	},
});

export default controlSlice.reducer;
export const actions = controlSlice.actions;