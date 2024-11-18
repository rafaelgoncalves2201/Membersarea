import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  usr_ID?: string;

  @Column({ type: 'varchar', length: 255 })
  usr_NAME: string;

  @Column({ type: 'varchar', length: 255 })
  usr_EMAIL: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  usr_PASS?: string;

  @Column({ type: 'varchar' })
  usr_USER_TYPE: string;

  @Column({ type: 'timestamptz' })
  usr_CREATION_DATE: Date;
}
