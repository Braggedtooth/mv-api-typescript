import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class RequestWithUser extends Request {
  user: User;
}
