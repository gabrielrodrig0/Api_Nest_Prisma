import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}

    async create({name, email, password, birthAt}:CreateUserDTO) {
        
        
        return await this.prisma.user.create({
            data:{
                 name,
                 email,
                 password,
                 birthAt: birthAt?new Date(birthAt):null  
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

    async put({name,email, password, birthAt}:UpdatePutUserDTO, id:number)
    {
        return this.prisma.user.update({
            where: {
                id
            },
            data:{
                name, 
                email, 
                password,
                birthAt:birthAt ? new Date(birthAt):null
            }
        })
    }

    async patch(data: UpdatePatchUserDTO, id:number) 
    {
    
        return this.prisma.user.update({
            where:{
                id
            },
            data
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