import { Test, TestingModule } from '@nestjs/testing'
import { UseMailerService } from './use-mailer.service'

describe('UseMailerService', () => {
  let service: UseMailerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseMailerService],
    }).compile()

    service = module.get<UseMailerService>(UseMailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
