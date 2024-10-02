import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private readonly reflector:Reflector){}

    async canActivate(context: ExecutionContext){

        const requiredRoles =  this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        

        const {user} = context.switchToHttp().getRequest()
         
        if (!user) {
            return false;
        }

        const hasRole = requiredRoles.some(role => role === user.role);

        return hasRole;
        
    }

}