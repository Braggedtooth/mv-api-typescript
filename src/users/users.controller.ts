import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../common/guards/role.guard';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { UserModel } from '../common/models/user.model';
import { UserType } from '../common/types/user.model';

@ApiTags('Users')
@UseGuards(RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Role('ADMIN')
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const { user } = await this.usersService.create(createUserDto);
    return user;
  }
  @Role('ADMIN')
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }
  @Role('ADMIN')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(id);
  }
  @Role('ADMIN', 'USER')
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
    return this.usersService.update(id, updateUserDto);
  }
  @Role('ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove(id);
  }
}
