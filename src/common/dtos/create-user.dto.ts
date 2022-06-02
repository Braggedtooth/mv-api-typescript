import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: "Micha" })
  firstname: string;
  @ApiProperty({ default: "Picha" })
  lastname: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ default: "Micha20012A" })
  password: string;

  @IsEmail()
  @ApiProperty({ default: "Micha@picha.com" })
  email: string;
}
