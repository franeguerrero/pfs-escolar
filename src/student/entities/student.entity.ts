import { Subject } from "src/subject/entities/subject.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { City } from "src/city/entities/city.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn()
    private idStudent: number;
    @Column()
    private fullName: string;
    @Column()
    private birth: string;
    @Column()
    private dni: number;
    @Column()
    private address: string;

    @ManyToOne(type => City, city => city.students)
    @JoinColumn()
    public city: City;
    
    @ManyToMany(type => Teacher, (teacher) => teacher.students)
    @JoinTable({
        name: 'teacher_student',
        joinColumn:{
            name: 'studentIdStudent',
            referencedColumnName: 'idStudent'
        },
        inverseJoinColumn:{
            name: 'teacherIdTeacher',
            referencedColumnName: 'idTeacher'
        }
    })
    public teachers: Teacher[];


    constructor ( fullName: string, birth: string, dni: number, address: string, city: City, teachers: Teacher[]) {
        this.fullName = fullName;
        this.birth = birth;
        this.dni = dni;
        this.address = address;
        this.city = city;
        this.teachers = teachers;
    }

    public getIdStudent(): number { return this.idStudent; }
    public setIdStudent(idStudent: number): void { this.idStudent = idStudent; }
    public getFullName(): string { return this.fullName; }
    public setFullName(fullName: string): void { this.fullName = fullName; }
    public getBirth(): string { return this.birth; }
    public setBirth(birth: string): void { this.birth = birth; }
    public getDniStudent(): number { return this.dni; }
    public setDniStudent(dni: number): void { this.dni = dni; }
    public getAddress(): string { return this.address; }
    public setAddress(address: string): void { this.address = address; }
    public getCity(): City { return this.city; }
    public setCity(city: City): void { this.city = city; }
}
