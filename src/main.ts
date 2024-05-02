import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/env';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const appPort = config.app.port;

    app.enableCors({
      origin: (origin, cb) => {
        cb(null, true);
      },
      credentials: true,
    });
    await app.listen(appPort);
    console.log('App started on: ' + appPort);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
