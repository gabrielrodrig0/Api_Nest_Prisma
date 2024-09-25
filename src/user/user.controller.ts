import { Body, Controller, Post, Get, Param, Patch, Delete, ParseIntPipe, Put, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ClassInterceptor } from "src/interceptors/class.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

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

    @UseInterceptors(ClassInterceptor)
    @Get(':id')
    async getOne(@ParamId()id:number)
    {
        return this.userService.getOne(id);
    }

    //Update Password
    @Patch(':id')
    async updatePatch(@Body() body:UpdatePatchUserDTO, @ParamId() id:number)
    {
        return this.userService.patch(body, id);
    }

    //Update ALL data
    @Put(':id')
    async updatePut(@Body()body:UpdatePutUserDTO, @ParamId() id:number)
    {
        return this.userService.put(body, id);
    }

    @Delete(':id')
    async delete(@ParamId() id:number)
    {
        return this.userService.delete(id);
    }
}