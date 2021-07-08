import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from 'src/modules/app.module';
import { ConfigService } from 'src/services/ConfigService';
import { logger } from 'src/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin(origin, callback) {
      if (!origin || origin === configService.config.AUTHORITY) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(configService.config.PORT);
}
bootstrap();
