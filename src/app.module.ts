import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';
import { HttpAdapterHost } from '@nestjs/core';
import { PeerServerMiddleware } from './peer.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
      ChatGateway,
      PeerServerMiddleware
  ],
})
export class AppModule{

    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(PeerServerMiddleware)
    //         .forRoutes('/peerjs');
    // }
}
