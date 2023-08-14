import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// run the migrations: npx typeorm migration:run

export class Add_Reset_Token_To_User implements MigrationInterface {
  // create changes
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'resetToken',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'resetTokenExpiration',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  // revert changes
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['resetToken', 'resetTokenExpiration']);
  }
}
