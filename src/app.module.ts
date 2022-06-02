import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UsersModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure  prisma middleware
      },
    }),
    AuthModule,
],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
