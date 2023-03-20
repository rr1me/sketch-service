import { PeerServer, PeerServerEvents } from 'peer';
import { Express } from 'express';

export class PeerjsGateway{
	private readonly peerServer: Express & PeerServerEvents;

	constructor() {
		this.peerServer = PeerServer({port: 3002, host: 'localhost'});
		this.initEvents()
	}

	initEvents(){
		this.peerServer.on('message', (client, message) => {
			console.log(`${client.getId()} says: `);
			console.log(message);
		})
		this.peerServer.on('connection', (client) => {
			console.log('connect id: ' + client.getId());
		});
		this.peerServer.on('disconnect', (client) => {
			console.log('disconnect id: ' + client.getId());
		});
	}
}