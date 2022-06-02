import { PrismaService } from 'nestjs-prisma';
import { Prisma, Roles, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password/password.service';
import { Token } from '../common/models/token.model';
import { SecurityConfig } from '../common/config/config.interface';
import { LoginDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) { }


  async login({ email, password }: LoginDto): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
      role: user.role
    });
  }



  generateTokens(payload: { userId: string, role: Roles }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: JwtDto): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: JwtDto): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  async refreshToken(token: string) {
    try {
      const { userId, role } = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
        role
      });
    } catch (e) {
      console.log(e);

      throw new UnauthorizedException("Invalid Token");
    }
  }
}
