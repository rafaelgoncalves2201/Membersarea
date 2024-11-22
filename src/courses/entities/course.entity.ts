import { User } from "src/user/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
const { nanoid } = require("nanoid")

@Entity('courses')
export class Course {
    
    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar', {length: 150})
    title: string;

    @Column('varchar')
    description: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'admin_id'})
    admin: User;

    @Column('varchar')
    admin_id: string;

    @Column()
    creation_date: Date;

    @Column('varchar', {length: 255})
    cover_url: string;

    @BeforeInsert()
    generateId(){
        this.id = `courses_${nanoid()}`;
        this.creation_date = new Date();
    }
}
