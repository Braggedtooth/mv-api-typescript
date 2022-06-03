import { Controller, Get } from '@nestjs/common'
import { Public } from '../common/decorators/public.decorator'
import { UseMailerService } from './use-mailer.service'

@Public()
@Controller('use-mailer')
export class UseMailerController {
  constructor(private readonly useMailerService: UseMailerService) {}

  @Get()
  sendeMail() {
    return this.useMailerService.verificationMail()
  }
}
