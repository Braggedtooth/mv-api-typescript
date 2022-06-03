import { MailerService } from '@nestjs-modules/mailer'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { MailDto } from './dto/mail.dto'

@Injectable()
export class UseMailerService {
    constructor(private readonly mailerService: MailerService) { }
    verificationMail(payload: MailDto) {
        const now = Date.now()
        const exp = format(now + 900000, 'hh:mm')
        try {
            this.mailerService.sendMail({
                to: { name: payload.name, address: payload.address },
                from: {
                    name: 'Mäklare Visionen',
                    address: 'maklarevisionen@gmail.com',
                },
                subject: 'Verify your account!',
                template: __dirname + '/index',
                context: {
                    name: payload.name,
                    expiration: exp,
                    verificationUrl: payload.verificationUrl,
                },
            })
            return 'sucess'
        } catch (error) {
            console.log(error)
            throw new ForbiddenException()
        }
    }
}
