import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
const { nanoid } = require("nanoid")

@Entity('courses')
export class Course {
    
    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar', {length: 150})
    title: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    admin_id: string;

    @Column()
    creation_date: Date;

    @Column('varchar', {length: 255})
    cover_url: string;

    @BeforeInsert()
    generateId(){
        this.id = `courses_${nanoid()}`
    }
}
