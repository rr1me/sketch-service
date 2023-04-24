import { INumberParam } from './INumberParam';
import { createSlice } from '@reduxjs/toolkit';

export type tLineCap = 'butt' | 'round' | 'square';

export interface ILineSlice {
	width: INumberParam,
	lineCap: 0 | 1 | 2
}

const lineSlice = createSlice ({
	name: 'lineSlice',
	initialState: {
		width: {
			v: 5,
			start: 1,
			end: 50
		},
		lineCap: 2
	} as ILineSlice,
	reducers: {
		setParam: (state: any, { payload }: { payload: { param: keyof ILineSlice, value: number | boolean } }) => {
			const { param, value } = payload;
			if (typeof value === 'number' && typeof state[param] === 'object') {
				state[param].v = value;
			} else {
				state[param] = value;
			}
		},
	}
});

export default lineSlice.reducer;
export const actions = lineSlice.actions;