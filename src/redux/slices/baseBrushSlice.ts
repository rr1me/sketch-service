import { createSlice } from '@reduxjs/toolkit';
import { INumberParam } from './INumberParam';

export interface IBaseBrushSlice {
	width: INumberParam
}

const baseBrushSlice = createSlice({
	name: 'baseBrushSlice',
	initialState: {
		width: {
			v: 5,
			start: 1,
			end: 50,
		}
	} as IBaseBrushSlice,
	reducers: {
		setParam: (state: any, { payload }: { payload: { param: keyof IBaseBrushSlice, value: number | boolean } }) => {
			const { param, value } = payload;
			if (typeof value === 'number') {
				state[param].v = value;
			} else {
				state[param] = value;
			}
		},
	},
});

export default baseBrushSlice.reducer;
export const actions = baseBrushSlice.actions;