import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoursesTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE courses (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar(256) NOT NULL,
            description varchar(512) NOT NULL,
            admin_id uuid NOT NULL,
            creation_date timestamptz NOT NULL,
            cover_url varchar(512) NOT NULL,
            CONSTRAINT courses_pk PRIMARY KEY (id),
            CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS courses;`);
  }
}
