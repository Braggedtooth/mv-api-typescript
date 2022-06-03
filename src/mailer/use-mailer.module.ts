import { Module } from '@nestjs/common'
import { UseMailerService } from './use-mailer.service'
import { UseMailerController } from './use-mailer.controller'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'
import { EmailConfig } from '../common/config/config.interface'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: config.get<EmailConfig>('email').username,
            pass: config.get<EmailConfig>('email').password,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },

        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UseMailerController],
  providers: [UseMailerService],
})
export class UseMailerModule {}
