// export interface IParam<T extends number | boolean> {
// 	v: T,
//
// }

// export interface IBaseBrushSlice {
// 	width: INumberParam
// }

import { IBaseBrushSlice } from './baseBrushSlice';

export interface INumberParam {
	v: number,
	start: number,
	end: number
}

export type IParamObject = IBaseBrushSlice