import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courses' })
export class CoursesEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 512 })
  description: string;

  @Column({ type: 'uuid' })
  admin_id: string;

  @Column({ type: 'timestamptz' })
  creation_date: Date;

  @Column({ type: 'varchar', length: 512 })
  cover_url: string;
}
