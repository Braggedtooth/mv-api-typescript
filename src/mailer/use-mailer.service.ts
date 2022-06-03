import { MailerService } from '@nestjs-modules/mailer'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { format } from 'date-fns'

@Injectable()
export class UseMailerService {
  constructor(private readonly mailerService: MailerService) {}
  verificationMail(): string {
    const exp = format(new Date(), 'yymmdd')
    try {
      this.mailerService.sendMail({
        to: { name: 'Adebayo Ajayi', address: 'me@bayo.se' },
        from: {
          name: 'Mäklare Visionen',
          address: 'maklarevisionen@gmail.com',
        },
        subject: 'Verify your Mv account!',
        template: __dirname + '/index',
        context: {
          firstname: 'Lucas',
          lastname: 'Sprite',
          expiration: exp,
          verificationUrl: 'https://mv.bayo.se',
        },
      })
      return 'sucess'
    } catch (error) {
      console.log(error)
      throw new ForbiddenException()
    }
  }
}
