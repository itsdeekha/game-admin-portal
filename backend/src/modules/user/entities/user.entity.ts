import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '~/infra/database/base-entity';
import { UserRole } from '~/shared/types';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    // select: false,
  })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
  })
  lastName: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 255,
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
