import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableGames1757809345260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'provider',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'game_url',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'games',
      new TableIndex({
        name: 'idx_games_name',
        columnNames: ['name'],
      })
    );

    await queryRunner.createIndex(
      'games',
      new TableIndex({
        name: 'idx_games_title',
        columnNames: ['title'],
      })
    );

    await queryRunner.createIndex(
      'games',
      new TableIndex({
        name: 'idx_games_category',
        columnNames: ['category'],
      })
    );

    await queryRunner.createIndex(
      'games',
      new TableIndex({
        name: 'idx_games_provider',
        columnNames: ['provider'],
      })
    );

    await queryRunner.createIndex(
      'games',
      new TableIndex({
        name: 'idx_games_created_at',
        columnNames: ['created_at'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('games', 'idx_games_name');
    await queryRunner.dropIndex('games', 'idx_games_title');
    await queryRunner.dropIndex('games', 'idx_games_category');
    await queryRunner.dropIndex('games', 'idx_games_provider');
    await queryRunner.dropIndex('games', 'idx_games_created_at');
    await queryRunner.dropTable('games', true);
  }
}
