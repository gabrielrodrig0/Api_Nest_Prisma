import { Body, Controller, Post, Get, Param, Patch, Delete, ParseIntPipe, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

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
    async updatePatch(@Body() body:UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number)
    {
        return this.userService.patch(body, id);
    }

    //Update ALL data
    @Put(':id')
    async updatePut(@Body()body:UpdatePutUserDTO, @Param('id', ParseIntPipe) id:number)
    {
        return this.userService.put(body, id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number)
    {
        return this.userService.delete(id);
    }
}