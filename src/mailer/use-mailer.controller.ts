import { Body, Controller, Get, Param, Query } from '@nestjs/common'
import { Public } from '../common/decorators/public.decorator'
import { MailDto } from './dto/mail.dto'
import { UseMailerService } from './use-mailer.service'

@Public()
@Controller('use-mailer')
export class UseMailerController {
  constructor(private readonly useMailerService: UseMailerService) { }

  @Get()
  sendMail(@Query() data: MailDto) {
    return this.useMailerService.verificationMail(data)
  }
}
