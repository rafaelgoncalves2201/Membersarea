import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProgressTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE progress (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            student_id uuid NOT NULL,
            course_id uuid NOT NULL,
            percentage varchar(10) NOT NULL,
            utdate_date timestamptz NOT NULL,
            CONSTRAINT progress_pk PRIMARY KEY (id),
            CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
            CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS progress;`);
  }
}
