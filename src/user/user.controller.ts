import { Body, Controller, Post, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";


@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    async create(@Body() data:CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async getUsers(){
        return this.userService.getUsers();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number)
    {
        return this.userService.getOne(id);
    }

    //Update Password
    @Patch(':id')
    async update(@Body() body:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number)
    {
        return this.userService.update(body, id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number)
    {
        return this.userService.delete(id);
    }
}