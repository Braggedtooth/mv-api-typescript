import { ApiProduces, ApiProperty, PartialType } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import { Role } from '../../common/decorators/role.decorator';
import { CreateUserDto } from '../../common/dtos/create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ enum: Roles })
  role?: Roles

}
