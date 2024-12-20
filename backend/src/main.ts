import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
  });
  const { default: graphqlUploadExpress } = await import(
    'graphql-upload/graphqlUploadExpress.mjs'
  );
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
