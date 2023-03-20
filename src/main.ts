import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  app.enableShutdownHooks();

  await app.listen(port);
})();