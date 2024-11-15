import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

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
