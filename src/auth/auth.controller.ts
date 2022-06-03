import { Body, Controller, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { RequestWithUser } from '../common/models/req.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Token } from '../common/models/token.model';
import { UserModel } from '../common/models/user.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto): Promise<Token> {
    const { accessToken, refreshToken } = await this.userService.create(
      signUpDto,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    const { accessToken, refreshToken } = await this.auth.login(loginDto);
    return {
      accessToken,
      refreshToken,
    };
  }

  @ApiBearerAuth()
  @Post('refresh-token')
  async refreshToken(@Query('token') token: string): Promise<Token> {
    const { refreshToken, accessToken } = await this.auth.refreshToken(token);
    return {
      accessToken,
      refreshToken,
    };
  }
  @ApiBearerAuth()
  @Post('me')
  async me(@Req() req: RequestWithUser): Promise<UserModel> {
    const { password, ...result } = await this.userService.getUserFromToken(
      req.user.id,
    );
    return result;
  }
}
