import { SetMetadata } from '@nestjs/common'
import { AccountStatus } from '@prisma/client'
import { STATUS_KEY } from '../CONSTANTS'

export const Status = (...args: AccountStatus[]) =>
  SetMetadata(STATUS_KEY, args)
