import { instanceToPlain } from 'class-transformer';
import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
