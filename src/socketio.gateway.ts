import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { IRoom } from './room';

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
		this.server.emit('message', `Welcome, client ${client.id}!`);
	}

	@SubscribeMessage('message')
	handleMessage(client: Socket, message: { x: number, y: number }) {
		console.log(`Received message from client ${client.id}: ${message}`);
		client.broadcast.emit('message', message);
	}

	@SubscribeMessage('makeRoom')
	makeRoom(client: Socket, data: IRoom) {
		// data.hostSocketId = client.id;
		const i = this.roomsService.makeRoom(data);
		client.emit('makeRoom', i);
		client.emit('rooms', this.roomsService.rooms);
	}

	@SubscribeMessage('subscribe')
	subscribe(client: Socket){
		client.emit('rooms', this.roomsService.rooms)
		client.join('subscribed');
	}
}