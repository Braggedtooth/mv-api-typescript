import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from '../auth/auth.service';
import { PasswordService } from '../auth/password/password.service';
import { UserType } from '../common/types/user.model';
import { CreateUserDto } from '../common/dtos/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}
  async create(payload: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
        select: {
          id: true,
          role: true,
          email: true,
          verified: true,
          status: true,
          firstname: true,
          lastname: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const token = this.authService.generateTokens({
        userId: user.id,
        role: user.role,
      });
      return { ...token, user };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserFromToken(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findAll(): Promise<UserType[]> {
    const user = await this.prisma.user.findMany({
      where: {
        status: {
          not: 'DELETED',
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        status: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findOne(id: string): Promise<UserType> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        status: {
          not: 'DELETED',
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        status: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserType> {
    const { email, firstname, lastname } = updateUserDto;
    if (email || lastname || firstname) {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          email,
          firstname,
          lastname,
        },
      });
      return user;
    }
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (user.role === 'ADMIN') {
      throw new UnauthorizedException(
        'cannot change the role of an admin user',
      );
    }
    if (user.status !== 'DELETED') {
      return await this.prisma.user.update({
        where: { id: id },
        data: {
          status: 'DELETED',
        },
      });
    }
  }
}
