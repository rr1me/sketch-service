export class Room implements IRoom{
	readonly name: string;
	readonly slots: number;
	readonly isPrivate: boolean;
	readonly password: string;

	users: User[]

	constructor(data: IRoom) {
		this.name = data.name;
		this.slots = data.slots;
		this.isPrivate = data.isPrivate;
		this.password = data.password;
		this.users = data.users
	}
}

export interface IRoom {
	name: string;
	slots: number;
	isPrivate: boolean;
	password: string;
	users: User[]
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