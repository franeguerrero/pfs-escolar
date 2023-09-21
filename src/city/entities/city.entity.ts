import { School } from "src/school/entities/school.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn()
    private idCity : number;
    @Column()
    private name : string;
    
    @OneToMany(type => School, school => school.city)
    @JoinColumn()
    public schools : School[];
    @OneToMany(type => Teacher, teacher => teacher.city)
    @JoinColumn()
    public teachers : Teacher[];
    @OneToMany(type => Student, student => student.city)
    @JoinColumn()
    public students : School[];

    constructor ( name : string) {
        this.name = name;
    }

    public getIdCity(): number { return this.idCity; }
    public setIdCity(idCity: number): void { this.idCity = idCity; }
    public getName(): string { return this.name; }
    public setName(name: string): void { this.name = name; }
}