import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly JWTService:JwtService,
        private readonly prisma:PrismaService,
        private readonly userService:UserService){}

    async createToken({id, email, name}:User)
    {
        return this.JWTService.sign(
            {
            id,
            email,
            name
            },
            {
             expiresIn:'7 days',
             subject:String(id),
             issuer:'Api NestJS',
             audience:'users'
            })
    }

    async checkToken(token:string)
    {

    }

    async login(email:string, password:string)
    {
        const user = await this.prisma.user.findFirst({
            where:{email, password}
        })

        if(!user) throw new UnauthorizedException('Email ou senha incorretos!')

        return this.createToken(user);
    }

    async register(body:AuthRegisterDTO)
    {
        const user = await this.userService.create(body)
        return this.createToken(user);
    }

    async reset(password:string, token:string)
    { 
       const id = 0;
       const user = this.prisma.user.update({
        where:{
            id
        },
        data:{
            password
        }
       })

       return this.JWTService.sign(user);
    }
    async forget(email:string)
    {
        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        })   
        if (!user) throw new UnauthorizedException('Email não existe!')

        return true;
    }

   
}