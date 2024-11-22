import { nanoid } from "nanoid";
import { Course } from "src/courses/entities/course.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, Column, Decimal128, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

export class Progress {

    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar')
    student_id: string;

    @Column('varchar')
    course_id: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'student_id'})
    student: User;

    @ManyToOne(() => Course, (course) => course.id)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column('decimal', { precision: 5, scale: 2 })
    percetage: Decimal128;

    @Column('timestamp')
    update_date: Date;

    @BeforeInsert()
    generateId(){
        this.id = `preogress_${nanoid()}`
        this.update_date = new Date();
    }
}
