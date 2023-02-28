import { createSlice } from '@reduxjs/toolkit';

export interface ISquareSlice {
	stroke: boolean
}

const squareSlice = createSlice ({
	name: 'squareSlice',
	initialState: {
		stroke: false
	} as ISquareSlice,
	reducers: {
		setParam: (state: any, { payload }: { payload: { param: keyof ISquareSlice, value: number | boolean } }) => {
			const { param, value } = payload;
			console.log(param, value);
			if (typeof value === 'number' && typeof state[param] === 'object') {
				state[param].v = value;
			} else {
				state[param] = value;
			}
		},
	}
});

export default squareSlice.reducer;
export const actions = squareSlice.actions;