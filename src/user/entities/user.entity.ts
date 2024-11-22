import { IsIn } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require("nanoid")

@Entity('user')
export class User {

    @PrimaryColumn('varchar')
    id: string;

    @Column('varchar', {length: 100})
    usr_name: string;

    @Column('varchar', {length: 255})
    usr_email: string;

    @Column('varchar', {length: 255})
    usr_password: string;

    @Column('char', {length: 10})
    @IsIn(['admin', 'student', 'student'])
    usr_user_type: string;

    @Column({ type: 'timestamp' })
    usr_creation_date: Date;

    @BeforeInsert()
    generateId(){
        const prefix = this.usr_user_type === 'admin'
        ? 'admin' : this.usr_user_type === 'student'
        ? 'student' : 'user';
        this.id = `${prefix}_${nanoid()}`;
        this.usr_creation_date = new Date();
    }
}
