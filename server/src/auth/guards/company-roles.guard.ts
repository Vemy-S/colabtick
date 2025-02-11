import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/company-roles-decorator';

@Injectable()
export class CompanyRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRole){
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if(!user){
      throw new HttpException('No user info provided', HttpStatus.BAD_REQUEST)
    }

    console.log(user.role)
    console.log(requiredRole)
  
    return requiredRole === user.role;
  }
}


