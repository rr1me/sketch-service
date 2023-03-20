import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socketio.gateway';
import { PeerjsGateway } from './peerjs.gateway';
import { RoomsService } from './rooms.service';

@Module({
	imports: [],
	controllers: [],
	providers: [
		RoomsService,
		SocketIoGateway,
		PeerjsGateway
	],
})
export class AppModule {
}
