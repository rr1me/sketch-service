import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressPeerServer } from 'peer';
import * as process from 'process';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  const peerServer = ExpressPeerServer(app.getHttpServer());
  // console.log(peerServer + "?!");

  const adapter = new IoAdapter(app.getHttpServer());
  app.useWebSocketAdapter(adapter);

  // const httpCorsOptions: CorsOptions = {
  //   origin: '*',
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // };
  // app.enableCors(httpCorsOptions);


  // peerServer.on('message', (client, message) => {
  //   console.log(`${client.getId()} says: `);
  //   console.log(message);
  // })
  // peerServer.on('connection', (client) => {
  //   console.log('connect id: ' + client.getId());
  // });
  // peerServer.on('disconnect', (client) => {
  //   console.log('disconnect id: ' + client.getId());
  // });

  app.enableShutdownHooks();


  app.use('/peerjs', peerServer);

  await app.listen(port);
})();