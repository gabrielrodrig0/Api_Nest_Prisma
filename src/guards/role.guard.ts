import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) || [];
        
        console.log('Required Roles:', requiredRoles); 

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            return false;
        }
        const hasRole = requiredRoles.filter(role => role === user.role).length;
        return hasRole > 0;
    }
}
