import { IsEmail, IsStrongPassword, IsString, IsOptional, IsDateString } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

    @IsEmail()
    email: string;
}