import { AppDispatch } from '../../redux/store';
import { IPos } from '../MainFrame/useControlledCanvas';

export interface ITool{
	canvas: HTMLCanvasElement,
	pos: { x: number, y: number },
	dispatch: AppDispatch,
	ctx: CanvasRenderingContext2D
}

export type RectangleCallback = {
	first: IPos,
	second: IPos,
	third: IPos
}

export type LineCallback = {
	start: IPos,
	end: IPos
}

export type Size = {h: number, w:number}
export type SquareCallback = {
	start: IPos,
	size: Size
}

export type CircleCallback = {
	center: IPos,
	radius: number
}

type EventCallback = void | RectangleCallback | SquareCallback | LineCallback | CircleCallback;

export type IToolType = (((e: MouseEvent) => EventCallback) | (() => EventCallback))[];