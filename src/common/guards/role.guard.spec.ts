import { UsersController } from 'src/users/users.controller';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(
      new RoleGuard(Reflect.getMetadata('role', UsersController)),
    ).toBeDefined();
  });
});
