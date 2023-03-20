export class Room implements IRoom{
	readonly name: string;
	// readonly hostSocketId: string;
	// readonly hostPeerId: string;
	readonly slots: number;
	readonly isPrivate: boolean;
	readonly password: string;

	users: User[]


	constructor(data: IRoom) {
		this.name = data.name;
		// this.hostSocketId = data.hostSocketId;
		// this.hostPeerId = data.hostPeerId;
		this.slots = data.slots;
		this.isPrivate = data.isPrivate;
		this.password = data.password;
	}
}

export interface IRoom {
	name: string;
	// hostSocketId: string;
	// hostPeerId: string;
	slots: number;
	isPrivate: boolean;
	password: string;
}

export class User {
	name: string;
	socketId: string;
	peerId: string;
	roomRole: RoomRole;


	constructor(name: string, socketId: string, peerId: string, roomRole: RoomRole) {
		this.name = name;
		this.socketId = socketId;
		this.peerId = peerId;
		this.roomRole = roomRole;
	}
}

type RoomRole = 'Host' | 'User'