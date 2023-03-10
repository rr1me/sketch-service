import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';





// @WebSocketGateway()
// export class ChatGateway {
// 	@SubscribeMessage('message')
// 	handleMessage(client: any, payload: any): string {
// 		return 'Hello world!';
// 	}
// }

@WebSocketGateway({ namespace: 'chat', cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	},})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	handleConnection(client: any) {
		console.log(`Client ${client.id} connected.`);
		this.server.emit('message', `Welcome, client ${client.id}!`);
	}

	@SubscribeMessage('message')
	handleMessage(client: any, message: string) {
		console.log(`Received message from client ${client.id}: ${message}`);
		this.server.emit('message', `Client ${client.id} says: ${message}`);
	}
}

