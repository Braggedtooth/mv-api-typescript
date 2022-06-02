import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@prisma/client';
import { ROLES_KEY } from '../CONSTANTS';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user.role, 'Hello from RoleGuard');

    return requiredRoles.some((role) => user.role === role);
  }
}
