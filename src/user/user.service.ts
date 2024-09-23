import { Injectable, NotFoundException } from "@nestjs/common";
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

    async getUsers() {
        return this.prisma.user.findMany();
        
    }

    async getOne(id:number){
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
        
    }

    async update({password}: UpdatePatchUserDTO, id:number) {
    
        return this.prisma.user.update({
            where:{
                id
            },
            data:{
                password
            }
        })
    }

    async delete(id:number) {

        if(!(await this.getOne(id)))
        {
            throw new NotFoundException('Usuário não existe!')
        }

        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

}