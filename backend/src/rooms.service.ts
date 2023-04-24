import { Injectable } from '@nestjs/common';
import { Room, IRoom, User } from './room';
import { SocketIoGateway } from './socketio.gateway';

// const user = new User('q', '32', '12', 'Host')
// const userr = new User('q', '323', '12', 'Host')
// const userd = new User('q', '321', '12', 'Host')

@Injectable()
export class RoomsService {
	public rooms: Room[] = [
		// new Room({name: 'eblan', isPrivate: false, slots: 5, password: '', users: [user]}),
		// new Room({name: 'eblan1', isPrivate: true, slots: 5, password: '', users: [userr]}),
		// new Room({name: 'eblan2', isPrivate: false, slots: 5, password: '', users: [userd]}),
	];

	makeRoom(data: IRoom) {
		console.log(this.rooms);
		// const indexOf = this.rooms.indexOf(undefined);
		// const i = indexOf !== -1? indexOf : this.rooms.length;

		const room = new Room(data);
		this.rooms.push(room);
		// this.rooms[i] = room;
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