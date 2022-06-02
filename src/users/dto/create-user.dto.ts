import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    firstname:  string
    lastname: string
     
    @IsNotEmpty()
    @MinLength(8)
    password:string

    @IsEmail()
    email : string
}
