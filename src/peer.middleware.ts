import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ExpressPeerServer, PeerServer, PeerServerEvents } from 'peer';
import { HttpAdapterHost } from '@nestjs/core';
import express from 'express';

@Injectable()
export class PeerServerMiddleware implements NestMiddleware {
	private readonly peerServer: express.Express & PeerServerEvents;

	constructor(
		@Inject(HttpAdapterHost)
		private readonly httpAdapterHost: HttpAdapterHost,
	) {
		// Set up the ExpressPeerServer instance
		// const httpServer = httpAdapterHost.httpAdapter.getHttpServer();
		// if (!httpServer) return;
		// console.log(httpAdapterHost);
		// console.log(httpServer + "??");
		// this.peerServer = ExpressPeerServer(httpServer);
		// this.peerServer.use('/peerjs', this.use)

		// const func = this.use;

		// this.peerServer;
		// this.peerServer();
		// // console.log(this.peerServer);
		// this.peerServer.on('message', (client, message) => {
		// 	console.log(`${client.getId()} says: `);
		// 	console.log(message);
		// })
		// this.peerServer.on('connection', (client) => {
		// 	console.log('connect id: ' + client.getId());
		// });
		// this.peerServer.on('disconnect', (client) => {
		// 	console.log('disconnect id: ' + client.getId());
		// });
	}

	async use(req: any, res: any, next: () => void) {
		// this.peerServer.use(this.use)
		// console.log(this.peerServer);
		// Wait for the PeerServer to be fully initialized before handling requests
		// await new Promise((resolve) => this.peerServer(req, res, resolve));

		// Pass control to the next middleware in the chain
		next();
	}
}
