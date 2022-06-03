import { Test, TestingModule } from '@nestjs/testing'
import { UseMailerController } from './use-mailer.controller'
import { UseMailerService } from './use-mailer.service'

describe('UseMailerController', () => {
  let controller: UseMailerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseMailerController],
      providers: [UseMailerService],
    }).compile()

    controller = module.get<UseMailerController>(UseMailerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
