import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/middleware/user-id-check.middleware";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[] 
})
    
//NestModule serve para implementar o configure, que permite o uso de Middlewares
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'users/:id',
            method: RequestMethod.ALL
        })
    }
}