import { IsJWT } from "class-validator"


export class Token {
    @IsJWT()
    accessToken : string 
    @IsJWT()
    refreshToken :string
}