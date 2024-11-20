import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require("nanoid")

@Entity('users')
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
    usr_user_type: string;

    @Column()
    usr_creation_date: Date;

    @BeforeInsert()
    generateId(){
        this.id = `user_${nanoid()}`;
        this.usr_creation_date = new Date();
    }
}
