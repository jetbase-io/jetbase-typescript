import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from 'src/services/ConfigService';
import User from 'src/entities/User';
import { UserController } from 'src/constrollers/user.controller';
import { UserService } from 'src/services/UserService';
import { UserGuard } from 'src/guards/user.guard';
import Session from 'src/entities/Session';
import { SessionService } from 'src/services/SessionService';

const configService = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.config.DB_HOST,
      port: configService.config.DB_PORT,
      username: configService.config.DB_USERNAME,
      password: configService.config.DB_PASSWORD,
      database: configService.config.DB_DATABASE,
      entities: [User, Session],
      ssl: configService.config.NODE_ENV === 'production',
      extra:
        configService.config.NODE_ENV === 'production'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : undefined,
    }),
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [UserController],
  providers: [ConfigService, UserService, SessionService, UserGuard],
})
export class AppModule {}
