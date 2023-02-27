import { INumberParam } from './INumberParam';
import { createSlice } from '@reduxjs/toolkit';

export interface ILineSlice {
	width: INumberParam
}

const lineSlice = createSlice ({
	name: 'lineSlice',
	initialState: {
		width: {
			v: 5,
			start: 1,
			end: 50
		}
	} as ILineSlice,
	reducers: {
		setParam: (state: any, { payload }: { payload: { param: keyof ILineSlice, value: number | boolean } }) => {
			const { param, value } = payload;
			if (typeof value === 'number') {
				state[param].v = value;
			} else {
				state[param] = value;
			}
		},
	}
});

export default lineSlice.reducer;
export const actions = lineSlice.actions;