import { Body, Controller, Post, Get, Param, Patch, Delete, ParseIntPipe, Put, UseInterceptors, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { ClassInterceptor } from "src/interceptors/class.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/roles.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";


@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Roles(Role.Admin)
    @Post()
    async create(@Body() data:CreateUserDTO){
        return this.userService.create(data);
    } 

    @Roles(Role.Admin)
    @Get()
    async getUsers(){
        return this.userService.getUsers();
    }

    @Roles(Role.Admin)
    @UseInterceptors(ClassInterceptor)
    @Get(':id')
    async getOne(@ParamId()id:number)
    {
        return this.userService.getOne(id);
    }

    @Roles(Role.Admin)
    //Update Password
    @Patch(':id')
    async updatePatch(@Body() body:UpdatePatchUserDTO, @ParamId() id:number)
    {
        return this.userService.patch(body, id);
    }

    @Roles(Role.Admin)
    //Update ALL data
    @Put(':id')
    async updatePut(@Body()body:UpdatePutUserDTO, @ParamId() id:number)
    {
        return this.userService.put(body, id);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number)
    {
        return this.userService.delete(id);
    }
}