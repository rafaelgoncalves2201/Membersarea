import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1706392503955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE users (
            usr_ID uuid NOT NULL DEFAULT uuid_generate_v4(),
            usr_NAME varchar(255) NOT NULL,
            usr_EMAIL varchar(255) NOT NULL UNIQUE,
            usr_PASS varchar(255),
            usr_USER_TYPE varchar(50) NOT NULL,
            usr_CREATION_DATE timestamptz NOT NULL,
            CONSTRAINT users_pk PRIMARY KEY (usr_ID)
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
