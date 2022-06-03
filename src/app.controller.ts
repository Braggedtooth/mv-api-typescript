import { MailerService } from '@nestjs-modules/mailer'
import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus'
import { AppService } from './app.service'
//import { SERVICE_URL } from './common/CONSTANTS';
import { Public } from './common/decorators/public.decorator'
import { PrismaHealthIndicator } from './healthcheck/db.healthcheck'
import { ServiceHealthIndicator } from './healthcheck/status.healthcheck'

@Public()
@ApiTags('Healthcheck')
@Controller()
export class AppController {
  constructor(
    private readonly dbHealth: PrismaHealthIndicator,
    private readonly healthCheckService: ServiceHealthIndicator,
    private readonly appService: AppService,
  ) {}
  @Get()
  @HttpCode(200)
  status() {
    return 'OK!'
  }

  @Get('status')
  @HealthCheck()
  checkService() {
    return this.healthCheckService.isHealthy('Service Check')
  }
  @Get('status/db')
  @HealthCheck()
  checkDb() {
    return this.dbHealth.isHealthy('prismaDB')
  }
}
