import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Link with USER
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' }) // Link with LESSON
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ type: 'boolean' })
  present: boolean;

  @Column({ type: 'datetime' })
  date: Date;
}
