import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Gender } from '../../types/Gender.enum';

// run the migrations: npx typeorm migration:run

export class Add_Gender_And_Birthdate_To_User implements MigrationInterface {
  // create changes
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'gender',
        type: 'enum', // Change the data type if needed
        enum: Object.values(Gender),
        isNullable: true, // Set to false if gender is mandatory
      }),
      new TableColumn({
        name: 'birthdate',
        type: 'date', // Change the data type if needed
        isNullable: true, // Set to false if birthdate is mandatory
      }),
    ]);
  }

  // revert changes
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['gender', 'birthdate']);
  }
}
