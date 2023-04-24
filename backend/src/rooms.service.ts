import { Injectable } from '@nestjs/common';
import { Room, IRoom, User } from './room';

@Injectable()
export class RoomsService {
	public rooms: Room[] = [
	];

	makeRoom(data: IRoom) {
		const room = new Room(data);
		this.rooms.push(room);
		console.log(this.rooms);
	}

	enter(roomName: string, user: User) {
		const room = this.rooms.find(x => x.name === roomName);
		room.users.push(user);
	}

	disconnect(peerId: string): boolean {
		let user: User;
		let index: number;

		for (let i = 0; i < this.rooms.length; i++) {
			user = this.rooms[i].users.find(x => x.peerId === peerId);

			if (user !== undefined) {
				index = i;
				break;
			}
		}

		if(user === undefined)
			return false;

		if (user.roomRole === 'Host') {
			this.rooms.splice(index, 1);
			console.log(this.rooms);
		}else
			this.rooms[index].users = this.rooms[index].users.filter(x => x.socketId !== user.socketId);

		return true;
	}

	changeRoom(room: IRoom){
		const roomToChange = this.rooms.find(x=>x.name);

		roomToChange.slots = room.slots;
		roomToChange.password = room.password
	}
}