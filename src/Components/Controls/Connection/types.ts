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

type PeerDataType = 'Drawing' | 'Canvas' | 'Kick'

export type PeerData = {
	type: PeerDataType;
	data: object | string | undefined
}