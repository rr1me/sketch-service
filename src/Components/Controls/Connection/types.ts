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
	isPrivate: boolean;
	password: string;

	users: IUser[]
}