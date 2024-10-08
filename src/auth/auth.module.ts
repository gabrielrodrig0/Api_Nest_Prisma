import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileModule } from "src/file/file.module";


//Para utilizar isso, precisamos criar um service, mas antes de tudo, é preciso instalar o jwt
//npm i @nestjs/jwt
@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    }),
    forwardRef(()=>UserModule),
    forwardRef(()=>FileModule),
    PrismaModule
],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}