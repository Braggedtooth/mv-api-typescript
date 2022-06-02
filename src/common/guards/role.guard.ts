import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

const ALLOWEDROLE = "ADMIN"

@Injectable()
export class RoleGuard extends AuthGuard("jwt") {

  
  canActivate(context: ExecutionContext): boolean {
    console.log("hola");
    
    const request = context.switchToHttp().getRequest();
    console.log(request);
    
    const user : User = request.user
    if(!user){
      return false
    }

    console.log(user, "Hello");
    
    if(user.role === ALLOWEDROLE) {
      return true
    }
    
  }
}
