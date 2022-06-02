import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus, Roles } from '@prisma/client';
import { UserType } from '../types/user.model';

export class UserModel {
    @ApiProperty()
    id: string
    @ApiProperty()
    firstname: string
    @ApiProperty()
    lastname: string
    @ApiProperty()
    email: string
    @ApiProperty({ enum: Roles })
    role: Roles
    @ApiProperty({ enum: AccountStatus })
    status: AccountStatus
    @ApiProperty()
    verified: boolean
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updatedAt: Date

}