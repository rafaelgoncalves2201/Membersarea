import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lessons' })
export class LessonsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid' })
  course_id: string;

  @Column({ type: 'varchar', length: 512 })
  description: string;

  @Column({ type: 'varchar', length: 512 })
  video_url: string;

  @Column({ type: 'varchar', length: 512 })
  extra_material: string;
}
