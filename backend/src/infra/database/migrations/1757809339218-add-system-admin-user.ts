import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '~/modules/user/entities/user.entity';
import { UserRole } from '~/shared/types';

export class AddSystemAdminUser1757809339218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = 'P@ssw0rd';

    await queryRunner.manager.insert(User, {
      email: 'itsdeekha@gmail.com',
      password: bcrypt.hashSync(password, salt),
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SuperAdmin,
    });

    await queryRunner.manager.insert(User, {
      email: 'axnguyen.it@gmail.com',
      password: bcrypt.hashSync(password, salt),
      firstName: 'Regular',
      lastName: 'Admin',
      role: UserRole.RegularAdmin,
    });
  }

  public async down(_: QueryRunner): Promise<void> {
    //
  }
}
