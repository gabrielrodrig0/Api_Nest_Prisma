import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly authService:AuthService, private readonly userService:UserService){}

    async canActivate(context: ExecutionContext){

        const request = context.switchToHttp().getRequest()
        
        const {authorization} = request.headers;

        try {
            const data = this.authService.checkToken((authorization ?? "").split(" ")[1])

            const user = await this.userService.getOne(data.id);

            request.tokenPayLoad = data
            request.user = user

            return true
        } catch (error) {
            return false
        }

    }

}