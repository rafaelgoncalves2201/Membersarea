import { Course } from "src/courses/entities/course.entity";
import { Entity, JoinColumn, Column, ManyToOne, PrimaryColumn, BeforeInsert } from "typeorm";

const { nanoid } = require("nanoid")

@Entity('lessons')
export class Lesson {
    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar', {length: 150})
    title: string;

    @Column('varchar')
    description: string;

    @Column('varchar', {length: 255})
    video_url: string;

    @Column('varchar', {length: 255})
    extra_materia: string;

    @Column('varchar')
    couse_id: string;

    @ManyToOne(() => Course, (course) => course.id, { nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'course_id '})
    course: Course;

    @BeforeInsert()
    generateId(){
        this.id = `lessons_${nanoid()}`;
    }

}