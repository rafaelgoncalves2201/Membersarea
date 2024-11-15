import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity('progress')
export class Progress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Ligação com USER
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' }) // Ligação com COURSE
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number;

  @Column({ type: 'datetime' })
  update_date: Date;
}