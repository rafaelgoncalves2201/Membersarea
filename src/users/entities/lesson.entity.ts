import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';


@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' }) // Ligação com COURSE
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 150 })
  title: string;

  @Column('text') // Equivalente ao NVARCHAR(MAX)
  description: string;

  @Column({ length: 255 })
  video_url: string;

  @Column({ length: 255 })
  extra_material: string;
}