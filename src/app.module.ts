import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './common/config/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt.guard';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './healthcheck/db.healthcheck';
import { ServiceHealthIndicator } from './healthcheck/status.healthcheck';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { UseMailerModule } from './mailer/use-mailer.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UsersModule,
    TerminusModule,
    HttpModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure  prisma middleware
      },
    }),
    AuthModule,
    UseMailerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ServiceHealthIndicator,
    PrismaHealthIndicator,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
