import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  usr_id: number;

  @Column({ length: 100 })
  usr_name: string;

  @Column({ length: 255, unique: true })
  usr_email: string;

  @Column({ length: 255 })
  usr_password: string;

  @Column({ length: 5 })
  usr_user_type: string;

  @Column({ type: 'datetime' })
  usr_creation_date: Date;
}
