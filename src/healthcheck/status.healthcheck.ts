import { Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthCheckService,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus'

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {
  constructor(private readonly healthCheckService: HealthCheckService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.healthCheckService.check([])
      return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError('Prisma check failed', e)
    }
  }
}
