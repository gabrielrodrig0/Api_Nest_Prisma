import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
    constructor(
        private readonly JWTService:JwtService,
        private readonly prisma:PrismaService,
        private readonly userService:UserService,
        private readonly mailer:MailerService)
        {}

    createToken({id, email, name}:User)
    {
        return {accessToken:this.JWTService.sign(
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
            })}
    }

    checkToken(token:string)
    {
        try {
            const data = this.JWTService.verify(token,{
                audience:'users',
                issuer:"Api NestJS"
            })

            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async login(email:string, password:string)
    {
        const user = await this.prisma.user.findFirst({
            where:{email}
        })

        if(!user) throw new UnauthorizedException('Usuário não existe')

        if(!await bcrypt.compare(password, user.password))
        {
            throw new UnauthorizedException("Credenciais Incorretas!")
        }

        return this.createToken(user);
    }

    async register(body:AuthRegisterDTO)
    {
        const user = await this.userService.create(body)
        return this.createToken(user);
    }

    async reset(password:string, token:string)
    { 
        
        try {
            const data:any = this.JWTService.verify(token,{
                issuer:'forget',
                audience:'users',
            })
            console.log(data)
            password = await bcrypt.hash(password, 10)
            console.log(password)
       
            const user = await this.prisma.user.update({
            where:{id:Number(data.id)},
            data:{password}
            });

        return this.createToken(user)
        
        } catch (error) {
            throw new BadRequestException(error)     
        }
    }
    async forget(email:string)
    {
        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        })   
        
        if (!user) throw new UnauthorizedException('Email não existe!')

        const token = this.JWTService.sign({
            id:user.id
        }, {
            expiresIn:'20 minutes',
            subject: String(user.id),
            audience:'users',
            issuer:"forget"
            }
        )
            
        await this.mailer.sendMail({
            subject:"Recuperação de senha",
            to:'gabrielrodrigonaga@gmail.com',
            template:'forget',
            context:{
                name:user.name,
                token
            }
        })

        return {msg:"O token de troca de senha foi enviado para o seu e-mail."};
    }

    isValidToken(token:string)
    {

        const data = this.checkToken(token);
        if(data) return true;

        return false;
    }

   
}