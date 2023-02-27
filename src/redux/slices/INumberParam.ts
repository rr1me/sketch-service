import { IBaseBrushSlice } from './baseBrushSlice';
import { ILineSlice } from './lineSlice';

export interface INumberParam {
	v: number,
	start: number,
	end: number
}

export type IParamObject = IBaseBrushSlice | ILineSlice