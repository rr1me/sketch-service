// export interface IParam<T extends number | boolean> {
// 	v: T,
//
// }

export interface IBaseBrushSlice {
	width: INumberParam,
	opacity: INumberParam,
	test: boolean
}

export interface INumberParam {
	v: number,
	start: number,
	end: number
}

export type IParamObject = IBaseBrushSlice