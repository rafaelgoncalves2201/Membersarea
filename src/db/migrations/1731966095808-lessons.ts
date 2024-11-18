import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonsTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE lessons (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            course_id uuid NOT NULL,
            description varchar(512) NOT NULL,
            video_url varchar(512) NOT NULL,
            extra_material varchar(512) NOT NULL,
            CONSTRAINT lessons_pk PRIMARY KEY (id),
            CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS lessons;`);
  }
}
