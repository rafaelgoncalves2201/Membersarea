// src/users/entities/course.entity.ts
import { User } from '../users/entities/user.entity';  // Ensure correct path
import { Course } from './course.entity'; // Fix path as needed

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text') 
  description: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Link with ADMIN (User)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @Column({ type: 'datetime' })
  creation_date: Date;

  @Column({ length: 255 })
  cover_url: string;
}
