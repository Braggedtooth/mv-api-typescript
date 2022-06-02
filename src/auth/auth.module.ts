import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityConfig } from 'src/common/config/config.interface';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthService } from './auth.service';
import { JwtStrategy } from './password/jwt.strategy';
import { PasswordService } from './password/password.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RoleGuard,
    UsersService,
    PasswordService,
  ],
  exports: [RoleGuard],
  controllers: [AuthController],

})
export class AuthModule {}
