import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { IRoom, User } from './room';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
	namespace: 'gateway', cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		transports: ['websocket', 'polling'],
		credentials: true,
	},
})
export class SocketIoGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly roomsService: RoomsService) {
	}

	handleConnection(client: Socket) {
		console.log(`Client ${client.id} connected.`);
		client.emit('message', `Welcome, client ${client.id}!`);
	}

	@SubscribeMessage('message')
	handleMessage(client: Socket, message: { x: number, y: number }) {
		console.log(`Received message from client ${client.id}: ${message}`);
		client.broadcast.emit('message', message);
	}

	@SubscribeMessage('makeRoom')
	makeRoom(client: Socket, data: IRoom) {
		this.roomsService.makeRoom(data);
		this.sendRooms();
	}

	@SubscribeMessage('subscribe')
	subscribe(client: Socket) {
		client.emit('rooms', this.roomsService.rooms);
		client.join('subscribed');
	}

	@SubscribeMessage('enter')
	enterInRoom(client: Socket, data: { roomName: string, user: User }) {
		this.roomsService.enter(data.roomName, data.user);
		this.sendRooms();
	}

	@SubscribeMessage('changeRoom')
	changeRoom(client: Socket, data: IRoom){
		this.roomsService.changeRoom(data);
		this.sendRooms();
	}

	sendRooms() {
		this.server.to('subscribed').emit('rooms', this.roomsService.rooms);
	}
}