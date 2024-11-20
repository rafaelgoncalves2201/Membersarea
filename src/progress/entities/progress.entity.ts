import { nanoid } from "nanoid";
import { BeforeInsert, Column, Decimal128, PrimaryColumn } from "typeorm";

export class Progress {

    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar')
    student_id: string;

    @Column('varchar')
    course_id: string;

    @Column('decimal', { precision: 5, scale: 2 })
    percetage: Decimal128;

    @Column()
    date: Date;

    @BeforeInsert()
    generateId(){
        this.id = `preogress_${nanoid()}`
        this.date = new Date();
    }
}
