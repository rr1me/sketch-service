import { IPos } from '../MainFrame/useControlledCanvas';

const c = 20;
export const updCoords = (e: MouseEvent, pos: IPos) => {
	pos.x = e.clientX - c;
	pos.y = e.clientY - c;
};