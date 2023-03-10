import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  const server = app.getHttpServer();
  const ioAdapter = new IoAdapter(server);

  app.useWebSocketAdapter(ioAdapter);

  const httpCorsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.enableCors(httpCorsOptions);

  // ioAdapter.set('origins', '*:*');
  // const ioCorsOptions: CorsOptions = {
  //   origin: '*',
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // };

  // ioAdapter.use((socket, next) => {
  //   ioCorsOptions.origin = socket.handshake.headers.origin;
  //   next();
  // });

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
