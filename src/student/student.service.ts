import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Student } from './entities/student.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class StudentService {
    private students: Student[] = [];
    
    constructor (
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
        private readonly cityService: CityService,
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>
    ) {}

    public async getAll(): Promise<Student[]> {
        try {
            const criteria:FindManyOptions = {relations: ["city", "teachers", 'teachers.subject']}
            this.students = await this.studentRepository.find(criteria);        
            return this.students;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error in search: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getById(id: number): Promise<Student> {
        try {
            const criteria: FindOneOptions = { relations:['city', 'teachers', 'teachers.subject'],where: { idStudent: id } }
            let student: Student = await this.studentRepository.findOne(criteria);
            if (!student) 
                throw new Error('The student was not found.')
            return student;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error in search for student ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async add(data: any): Promise<string> {
        try {
            if (data)
                if ( data.fullName && data.birth && data.dni && data.address && data.idCity && data.idsTeacher) 
                    if (await this.studentExistsByDni(data.dni)) {
                        throw new Error('The student already exists.')
                    } else {
                        //let teachers: Teacher[] = await this.teacherRepository.find(criteria)
                        const teachers: Teacher[] = await this.teacherRepository.findByIds(data.idsTeacher)
                        let city: City =  await this.cityService.getById(data.idCity)
                        await this.studentRepository.save(new Student( data.fullName, data.birth, data.dni, data.address, city, teachers));
                    }
                else
                    throw new Error('Data for creating a student is not valid');
            else
                throw new Error('No data to create a student');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }

    public async delete(id: number): Promise<string> {
        try {
            if (id)
                if (await this.studentExists(id)) {
                    await this.studentRepository.delete(id);
                } else
                    throw new Error('The student was not found.')
            else
                throw new Error('No data to delete students');
            return "ok";
            } catch (error) {
                return error.message;            
        }
    }

    public async update(id: number, data: any): Promise<string> {
        try {
            if (data)
                if (data.idStudent && data.fullName && data.birth && data.dni && data.address && data.idCity) 
                    if (await this.studentExists(id)) {
                        let criteria: FindOneOptions = { where: { idStudent: id } }
                        let student: Student = await this.studentRepository.findOne(criteria);
                        let city: City =  await this.cityService.getById(data.idCity);
                        student.setFullName(data.fullName);
                        student.setBirth(data.birth);
                        student.setDniStudent(data.dni);
                        student.setAddress(data.address);
                        student.setCity(city)
                        await this.studentRepository.save(student);
                    } else
                        throw new Error('The student was not found.')                    
                else
                    throw new Error('Data to modify student is not valid');
            else
                throw new Error('No data to modify student');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }

    private async studentExists(id: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { idStudent: id } };
        let student: Student = await this.studentRepository.findOne(criteria);
        return (student != null);
    }

    private async studentExistsByDni(dni:number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { dni: dni} };
        let student: Student = await this.studentRepository.findOne(criteria);
        return (student != null);
    }
}
