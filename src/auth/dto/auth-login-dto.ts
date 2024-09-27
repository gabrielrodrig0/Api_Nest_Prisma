import { IsEmail, IsString } from "class-validator";

export class AuthLoginDTO {

    @IsEmail()
    @IsString()
    email:string;

    @IsString()
    password:string;

}