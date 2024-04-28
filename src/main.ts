import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  const configService = app.get(ConfigService);
  const PORT = configService.get('port') || 5000;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });

  await app.listen(PORT, () =>
    console.log(
      `\x1b[34m[Telegram Server] \x1b[32mСервер запущен на порту: \x1b[33m${PORT}\x1b[0m`,
    ),
  );
}
bootstrap();
