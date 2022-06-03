import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccountStatus } from '@prisma/client'
import { NextFunction } from 'express'
import { STATUS_KEY } from '../CONSTANTS'
import { RequestWithUser } from '../models/req.model'

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredStatus = this.reflector.getAllAndOverride<AccountStatus[]>(
      STATUS_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredStatus) {
      throw new UnauthorizedException('Not Allowed')
    }
    const request: RequestWithUser = context.switchToHttp().getRequest()
    const next = context.switchToHttp().getNext
    if (request.user.status === 'BANNED') {
      throw new UnauthorizedException('Your Account has been banned')
    }
    if (request.user.status === 'PENDING') {
      throw new UnauthorizedException('Your account is Pending')
    }
    if (request.user.status === 'ACTIVE') {
      return next()
    }
  }
}
