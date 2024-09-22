import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}

    async create({name, email, password}:CreateUserDTO) {
        
        
        return await this.prisma.user.create({
            data:{
                 name,
                 email,
                 password    
            }, //Após inserir ele faz um select para mostrar um o mais dados que você queira retornar, nocaso quero apenas o id
           
        })
    }

    getUsers() {
        return this.prisma.user.findMany();
        
    }

    getOne(id:number){
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
        
    }

    update({password}: UpdatePatchUserDTO, id:number) {
    
        return this.prisma.user.update({
            where:{
                id
            },
            data:{
                password
            }
        })
    }

    delete(id:number) {
        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

}