import { Roles } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface JwtDto extends JwtPayload {
  userId: string;
  role: Roles;
}
