import { Injectable } from '@nestjs/common';
import { Room, IRoom, User } from './room';

const user = new User('q', '32', '12', 'Host')
const userr = new User('q', '323', '12', 'Host')
const userd = new User('q', '321', '12', 'Host')


const roomone = new Room({name: 'eblan', isPrivate: false, slots: 5, password: ''});
roomone.users = [user]
const roomtwo = new Room({name: 'eblan1', isPrivate: true, slots: 5, password: ''});
roomtwo.users = [userr]
const roomthree = new Room({name: 'eblan2', isPrivate: false, slots: 5, password: ''});
roomthree.users = [userd]

@Injectable()
export class RoomsService {
	public rooms: Room[] = [
		roomone,
		roomtwo,
		roomthree,
	];

	makeRoom(data: IRoom): number{
		const indexOf = this.rooms.indexOf(undefined);
		const i = indexOf !== -1? indexOf : this.rooms.length;

		this.rooms[i] = new Room(data);
		console.log(this.rooms);
		return i;
	}
}