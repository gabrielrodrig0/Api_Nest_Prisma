import { Controller, Post, Body, Headers, UseGuards, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthResetDTO } from "./dto/auth-reset-dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('auth')
export class AuthController{

    constructor(private readonly authService:AuthService, private readonly fileService:FileService){}

    @Post('login')
    async login(@Body() {email, password}:AuthLoginDTO)
    {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body:AuthRegisterDTO)
    {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}:AuthForgetDTO)
    {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {password, token}:AuthResetDTO)
    {
        this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user)
    {
        return {user}
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({
        validators:[
            new FileTypeValidator({fileType:'image/png'}),
            new MaxFileSizeValidator({maxSize:1024*10})
        ]
    })) file: Express.Multer.File) {
       const path = `C:\\Users\\3470648\\Desktop\\Api_Nest_Prisma\\src\\storage\\photos\\photo-${user.id}.png`;
      try {
        await this.fileService.upload(file, path);
      } catch (error) {
        throw new BadRequestException('Arquivo em formato errado')
      }
       return {success:"true", msg:"Arquivo armazenado com sucesso!"}
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name:'photo',
        maxCount:1
    },{
        name: 'documents',
        maxCount:10
    }]))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: {photo:Express.Multer.File, documents: Express.Multer.File[]}) {
     return files
    }

}