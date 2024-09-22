import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


//A classe PrismaService extende e outra classe PrismaClient e implementa uma interface OnModuleInit, 
//A classe PrismaClient possui o metodo $connect() que vai conectar com o banco de dados
//Já a interface OnModuleInit possui um método que precisa ser implementado, esse método executa uma função sempre que começa a aplicação

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

    async onModuleInit() {
        await this.$connect()
    }
     
    //Para não criar gargalos, temos que fechar o banco sempre que a aplicação feche, logo utilizamos o método da classe PrismaClient
    async enableShutdownHooks(app:INestApplication)
    {
        process.on('beforeExit', async() => {
            await app.close();
        })
    }
}