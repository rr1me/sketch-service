import { IPos } from '../MainFrame/useControlledCanvas';

const fixCoords = 25;
export const updCoords = (e: MouseEvent, pos: IPos, canvas: HTMLCanvasElement) => {
	const sw = Number(canvas.style.width.match(/\d+/g)![0]);
	const sh = Number(canvas.style.height.match(/\d+/g)![0]);
	const w = canvas.width;
	const h = canvas.height;

	pos.x = ((e.clientX * w) / sw) - fixCoords;
	pos.y = ((e.clientY * h) / sh) - fixCoords;
};