import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

export interface Name {
    familyName: string;
    givenName: string;
    middleName: string;
}

@Entity({ name: 'user' })
export class User{
    constructor(provider: string,
                displayName: string,
                name: Name,
                emails: string,
                photos: Array<any>){
        this.provider = provider;
        this.displayName = displayName;
        this.name = name;
        this.emails = emails;
        this.photos = photos;
    }

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    provider: string;

    @Column()
    displayName: string;

    @Column()
    name: Name;

    @Column()
    emails: string;

    @Column()
    photos: Array<any>;
}