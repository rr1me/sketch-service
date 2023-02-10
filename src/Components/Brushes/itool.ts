import React from 'react';
import { AppDispatch } from '../../redux/store';

export interface ITool{
	canvas: React.RefObject<HTMLCanvasElement>,
	pos: { x: number, y: number },
	dispatch: AppDispatch
}