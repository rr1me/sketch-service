import { createSlice } from '@reduxjs/toolkit';
import { IBaseBrushSlice, INumberParam } from './INumberParam';

// interface IBaseBrushSlice {
// 	width: INumberParam,
// 	opacity: INumberParam,
// 	test: boolean
// }

const baseBrushSlice = createSlice({
	name: 'baseBrushSlice',
	initialState: {
		width: {
			v: 5,
			start: 1,
			end: 50,
		},
		opacity: {
			v: 1,
			start: 0,
			end: 1,
		},
		test: true,
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