import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class CustomSocketIoAdapter extends IoAdapter {
	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options);
		server.origins('*:*'); // Set the allowed origins for CORS (here, any origin is allowed)
		return server;
	}
}
