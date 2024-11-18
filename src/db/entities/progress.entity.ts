import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'progress' })
export class ProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid' })
  student_id: string;

  @Column({ type: 'uuid' })
  course_id: string;

  @Column({ type: 'varchar' })
  percentage: string;

  @Column({ type: 'timestamptz' })
  utdate_date: Date;
}
