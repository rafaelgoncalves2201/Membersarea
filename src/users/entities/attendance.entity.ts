// src/users/entities/attendance.entity.ts
import { User } from '../users/entities/user.entity';  // Ensure correct path
import { Lesson } from './lesson.entity';  // Correct the import path

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
