import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require("nanoid")

@Entity('attendances')
export class Attendance {

    @PrimaryColumn('varchar')
    id: string;

    @Column()
    student_id: string;

    @Column()
    lesson_id: string;

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
