import { ApiProperty } from '@nestjs/swagger'
import { IsJWT } from 'class-validator'

export class Token {
  @ApiProperty()
  @IsJWT()
  accessToken: string
  @ApiProperty()
  @IsJWT()
  refreshToken: string
}
