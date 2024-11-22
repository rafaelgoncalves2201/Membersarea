import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";

const { nanoid } = require("nanoid")

@Entity('attendances')
export class Attendance {

    @PrimaryColumn('varchar')
    id: string;

    @Column()
    student_id: string;

    @Column()
    lesson_id: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'student_id'})
    student: User;
    

    @ManyToOne(() => Lesson, (lesson) => lesson.id, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;

    @Column({
        type: 'bit',
        length: '1',
        default: () => "'0'",
    })
    present: boolean;

    @Column('timestamp')
    date: Date;

    @BeforeInsert()
    generateId(){
        this.id = `attendance_${nanoid()}`
    }
}
