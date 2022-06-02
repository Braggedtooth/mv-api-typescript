import { Body, Controller, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { RequestWithUser } from 'src/common/models/req.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, refreshToken } = await this.auth.login(loginDto);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto) {
    const { accessToken, refreshToken } = await this.userService.create(
      signUpDto,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  @Post('refresh-token')
  async refreshToken(@Query('token') token: string) {
    const { refreshToken, accessToken } = await this.auth.refreshToken(token);
    return {
      accessToken,
      refreshToken,
    };
  }
  @Post('me')
  async me(@Req() req: RequestWithUser) {
    const { password, ...result } = await this.userService.getUserFromToken(
      req.user.id,
    );
    return result;
  }
}
