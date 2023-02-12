import { AppDispatch } from '../../redux/store';

export interface ITool{
	canvas: HTMLCanvasElement,
	pos: { x: number, y: number },
	dispatch: AppDispatch
}

export type IToolType = (((e: MouseEvent) => void) | (() => void))[];