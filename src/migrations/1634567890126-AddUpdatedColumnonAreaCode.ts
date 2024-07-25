import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAtToAreaCode1634567890126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the updated_at column with a default value of the current timestamp
    await queryRunner.query(
      `ALTER TABLE area_code ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
    );

    // Set up a trigger to update the updated_at column on row updates
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_area_code_updated_at
      BEFORE UPDATE ON area_code
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the trigger and the function
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_area_code_updated_at ON area_code`,
    );
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column`);

    // Drop the updated_at column
    await queryRunner.query(`ALTER TABLE area_code DROP COLUMN updated_at`);
  }
}
