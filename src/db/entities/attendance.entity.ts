import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendance' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid' })
  student_id: string;

  @Column({ type: 'uuid' })
  lesson_id: string;

  @Column({ type: 'varchar', nullable: true })
  presen?: string;

  @Column({ type: 'timestamptz' })
  date: Date;
}
