import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'gateway', cors: {
		origin: "*",
		methods: ["GET", "POST"],
		transports: ['websocket', 'polling'],
		credentials: true
	},
	// allowEIO3: true
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	handleConnection(client: Socket) {
		// console.log(`Client ${client.id} connected.`);
		// this.server.emit('message', `Welcome, client ${client.id}!`);
	}

	@SubscribeMessage('message')
	handleMessage(client: Socket, message: { x: number, y: number }) {

		// console.log(message);
		// console.log(`Received message from client ${client.id}: ${message.x, message.y}`);
		// client.broadcast.emit('message', message);
	}
}

