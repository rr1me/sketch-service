import { PeerServer, PeerServerEvents } from 'peer';
import { Express } from 'express';
import { RoomsService } from './rooms.service';
import { Injectable } from '@nestjs/common';
import { SocketIoGateway } from './socketio.gateway';

@Injectable()
export class PeerjsGateway{
	private readonly peerServer: Express & PeerServerEvents;

	constructor(private readonly roomsService: RoomsService, private readonly socketIoGateway: SocketIoGateway) {
		this.peerServer = PeerServer({port: 3002, host: 'localhost'});
		this.initEvents()
	}

	initEvents(){
		this.peerServer.on('message', (client, message) => {
			console.log(message);
		})
		this.peerServer.on('connection', (client) => {
			console.log('connect id: ' + client.getId());
		});
		this.peerServer.on('disconnect', (client) => {
			console.log('disconnect id: ' + client.getId());

			const roomExist = this.roomsService.disconnect(client.getId());
			if (roomExist)
				this.socketIoGateway.sendRooms();
		});
	}
}