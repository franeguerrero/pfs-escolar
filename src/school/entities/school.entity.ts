
import { City } from "src/city/entities/city.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('school')
export class School {
    @PrimaryGeneratedColumn()
    private idSchool: number;
    @Column()
    private name: string;
    @Column()
    private address: string;

    @ManyToOne(type => City, city => city.schools)
    @JoinColumn()
    public city: City;

    @OneToMany(type => Teacher, teacher => teacher.school)
    @JoinColumn()
    public teachers: Teacher[]

    @OneToMany(type => Subject, subjects => subjects.school)
    @JoinColumn()
    public subjects: Subject[];

    constructor( name: string, address: string, city: City) {
        this.name = name;
        this.address = address;
        this.city = city;
    }

    public getIdSchool(): number { return this.idSchool; }
    public setIdSchool(idSchool: number): void { this.idSchool = idSchool; }
    public getName(): string { return this.name; }
    public setName(name: string): void { this.name = name; }
    public getAddress(): string { return this.address; }
    public setAddress(address: string): void { this.address = address; }
    public getCity(): City { return this.city; }
    public setCity(city: City): void { this.city = city; }
}
