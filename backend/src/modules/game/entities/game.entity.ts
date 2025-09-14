import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/infra/database/base-entity';

@Entity({ name: 'games' })
export class Game extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
  })
  category: string;

  @Column({
    name: 'provider',
    type: 'varchar',
    length: 255,
  })
  provider: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 500,
  })
  imageUrl: string;

  @Column({
    name: 'game_url',
    type: 'varchar',
    length: 500,
  })
  gameUrl: string;
}
