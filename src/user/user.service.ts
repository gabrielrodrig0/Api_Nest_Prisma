import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}

    async create({name, email, password, birthAt, role}:CreateUserDTO) {
        const salt = await bcrypt.genSalt();
        console.log(salt);

        password = await bcrypt.hash(password, salt)
        return await this.prisma.user.create({
            data:{
                 name,
                 email,
                 password,
                 birthAt: birthAt?new Date(birthAt):null,
                 role
            }, 
           
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

    async put({name,email, password, birthAt, role}:UpdatePutUserDTO, id:number)
    {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt)
        return this.prisma.user.update({
            where: {
                id
            },
            data:{
                name, 
                email, 
                password,
                birthAt:birthAt ? new Date(birthAt):null,
                role
            }
        })
    }

    async patch({name, email, password, birthAt, role}: UpdatePatchUserDTO, id:number) 
    {
        const data:any =  {}

        if(name) data.name=name;
        if(email) data.email=email;
        
        if(password) {
            const salt = await bcrypt.genSalt();
            data.password=await bcrypt.hash(data.password, salt);
        }
        if(birthAt) data.birthAt=new Date(birthAt);
        if(role) data.role=role;
        

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