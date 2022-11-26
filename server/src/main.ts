import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3333

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-forwarded-for',
  })

  app.useGlobalPipes(new ValidationPipe());
  console.log(`Hey, server started on port ${PORT}`)
  await app.listen(PORT);
}

bootstrap();
