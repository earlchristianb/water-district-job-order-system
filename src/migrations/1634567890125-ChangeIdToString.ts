import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIdToString1634567890125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the existing id column to old_id
    await queryRunner.query(`ALTER TABLE area_code RENAME COLUMN id TO old_id`);

    // Add the new id column with UUID type
    await queryRunner.query(
      `ALTER TABLE area_code ADD COLUMN id uuid DEFAULT uuid_generate_v4()`,
    );

    // Copy the values from old_id to id
    await queryRunner.query(`UPDATE area_code SET id = old_id::uuid`);

    // Drop the old_id column
    await queryRunner.query(`ALTER TABLE area_code DROP COLUMN old_id`);

    // Set the new id column as the primary key
    await queryRunner.query(`ALTER TABLE area_code ADD PRIMARY KEY (id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add the old_id column back
    await queryRunner.query(`ALTER TABLE area_code ADD COLUMN old_id SERIAL`);

    // Copy the values from id to old_id
    await queryRunner.query(`UPDATE area_code SET old_id = id::text::integer`);

    // Drop the new id column
    await queryRunner.query(`ALTER TABLE area_code DROP COLUMN id`);

    // Rename old_id back to id
    await queryRunner.query(`ALTER TABLE area_code RENAME COLUMN old_id TO id`);

    // Set the old id column as the primary key
    await queryRunner.query(`ALTER TABLE area_code ADD PRIMARY KEY (id)`);
  }
}
