import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import fastifyStatic from '@fastify/static';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.getHttpAdapter().getInstance().register(fastifyStatic, {
    root: join(__dirname, '..', 'frontend', 'build'),
    prefix: '/',
  });

  await app.listen(3000);
}
bootstrap();
