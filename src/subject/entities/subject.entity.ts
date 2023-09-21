import { School } from "src/school/entities/school.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Student } from "src/student/entities/student.entity";
import { Entity, PrimaryGeneratedColumn, Column,  ManyToMany, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('subject')
export class Subject {
    @PrimaryGeneratedColumn()
    private idSubject: number;
    @Column()
    private name: string;
    
    @ManyToOne(type => School, school => school.subjects)
    @JoinColumn()
    public school: School;

    @OneToMany(type => Teacher, teacher => teacher.subject)
    @JoinColumn()
    public teacher: Teacher;


    constructor(name: string) {
        this.name = name;
    }

    public getIdSubject(): number { return this.idSubject; }
    public getName(): string { return this.name; }
    public setName(name: string): void { this.name = name; }
    public getSchool(): School { return this.school; }
    public setSchool(school: School): void { this.school = school; }
}
