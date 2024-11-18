import { MigrationInterface, QueryRunner } from 'typeorm';

export class AttendanceTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE attendance (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            student_id uuid NOT NULL,
            lesson_id uuid NOT NULL,
            presen varchar(50) NOT NULL DEFAULT 'PRESENT',
            date timestamptz NOT NULL,
            CONSTRAINT attendance_pk PRIMARY KEY (id),
            CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
            CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS attendance;`);
  }
}
