import { Size } from '../../Brushes/itool';
import { IPos } from '../../MainFrame/useControlledCanvas';
import { brushType } from '../../../redux/slices/controlSlice';

export type RoomRole = 'Host' | 'User'

export type IUser = {
	name: string;
	socketId: string;
	peerId: string;
	roomRole: RoomRole;
}

export type IRoom = {
	name: string;
	slots: number;
	password: string;

	users: IUser[]
}

type PeerDataType = 'Drawing' | 'Canvas' | 'Kick'

export type BrushBody = {
	type: brushType,
	condition: 'start' | 'move' | 'end'
	x: number,
	y: number,
	params: {
		width: number,
		opacity: number,
		color: string
	}
}

type BasicParams = {
	color: string,
	opacity: number
}

export type SquareBody = {
	type: brushType,
	start: IPos,
	size: Size,
	params: BasicParams
}

export type CircleBody = {
	type: brushType,
	center: IPos,
	radius: number,
	params: BasicParams
}

export type RectangleBody = {
	type: brushType,
	first: IPos,
	second: IPos,
	third: IPos,
	params: BasicParams
}

export type LineBody = {
	type: brushType,
	start: IPos,
	end: IPos,
	params: {
		width: number,
		opacity: number,
		color: string,
		cap: 'butt' | 'round' | 'square'
	}
}

export type Body = BrushBody | SquareBody | CircleBody | RectangleBody | LineBody | string
export type PeerData = {
	type: PeerDataType;
	body: Body
}