import { City } from "src/city/entities/city.entity";
import { School } from "src/school/entities/school.entity";
import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from "typeorm";

@Entity('teacher')
export class Teacher {
    @PrimaryGeneratedColumn()
    private idTeacher: number;
    @Column()
    private fullName: string;
    @Column()
    private dni: number;
    @Column()
    private address: string;

    @ManyToOne(type => City, city => city.teachers)
    @JoinColumn()
    public city: City;

    @ManyToOne(type => School, school => school.teachers)
    @JoinColumn()
    public school: School;

    @ManyToOne(type => Subject, subject => subject.teacher)
    @JoinColumn()
    public subject: Subject;

    @ManyToMany(type => Student, student => student.teachers)
    public students: Student;

    constructor( fullName: string, dni: number, address: string, city: City, subject: Subject, school: School) {
        this.fullName = fullName;
        this.dni = dni;
        this.address = address;
        this.city = city;
        this.subject = subject;
        this.school = school
    }

    public getIdTeacher(): number { return this.idTeacher; }
    public getFullName(): string { return this.fullName; }
    public setFullName(fullName: string): void { this.fullName = fullName; }
    public getDniTeacher(): number { return this.dni; }
    public setDniTeacher(dni: number): void { this.dni = dni; }
    public getAddress(): string { return this.address; }
    public setAddress(address: string): void { this.address = address; }
    public getCity(): City { return this.city; }
    public setCity(city: City): void { this.city = city; }
    public getSubject(): Subject { return this.subject; }
    public setSubject(subject: Subject): void { this.subject = subject; }
    public getSchool(): School { return this.school; }
    public setSchool(school: School): void { this.school = school; }
}
