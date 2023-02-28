import { IBaseBrushSlice } from './baseBrushSlice';
import { ILineSlice } from './lineSlice';

export interface INumberParam {
	v: number,
	start: number,
	end: number
}

export type IParamObject = ILineSlice | IBaseBrushSlice