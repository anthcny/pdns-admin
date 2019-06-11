import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    // @Column("text")
    // login: string;

    @Column("text")
    email: string;

    @Column("text")
    hashPassword: string;

    // @Column()
    // role: number;

}
