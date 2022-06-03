import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsFQDN, IsUrl } from 'class-validator'

export class MailDto {
    @ApiProperty({ default: "Johny Bum" })
    name: string
    @ApiProperty({ default: "me@bayo.se" })
    @IsEmail()
    address: string
    @ApiProperty({ default: 'https://mv.bayo.se/verifiera?token=devToken' })
    @IsUrl()
    verificationUrl: string
}