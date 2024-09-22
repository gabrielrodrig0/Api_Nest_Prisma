import { IsEmail, IsStrongPassword, IsString } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsStrongPassword()
    password: string;

    @IsEmail()
    email: string;
}