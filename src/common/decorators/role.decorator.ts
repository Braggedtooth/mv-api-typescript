import { SetMetadata } from '@nestjs/common'
import { Roles } from '@prisma/client'
import { ROLES_KEY } from '../CONSTANTS'

export const Role = (...args: Roles[]) => SetMetadata(ROLES_KEY, args)
