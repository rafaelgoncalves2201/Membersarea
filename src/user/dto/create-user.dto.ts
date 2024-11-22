import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    usr_name: string;

    @IsEmail()
    usr_email: string;

    @IsString()
    usr_password: string;

    @IsString()
    usr_user_type: string;
}
