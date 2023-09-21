import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { Subject } from 'src/subject/entities/subject.entity';
import { SubjectService } from 'src/subject/subject.service';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class TeacherService {
    private teachers: Teacher[] = [];
    
    constructor (
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
        private readonly cityService: CityService,
        private readonly subjectService: SubjectService,
        private readonly schoolService: SchoolService
        ) {}
    
    public async getAll(): Promise<Teacher[]> {
        try {
            const criteria:FindManyOptions = {relations: ["city", "subject", "school"]}
            this.teachers = await this.teacherRepository.find(criteria);        
            return this.teachers;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error in the search: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async getById(id: number): Promise<Teacher> {
        try {
            const criteria: FindOneOptions = { relations: ['subject'], where: { idTeacher: id } }
            let teacher: Teacher = await this.teacherRepository.findOne(criteria);
            if (!teacher) 
                throw new Error('The teacher was not found.')
            return teacher;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error in the search for teacher ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async add(data: any): Promise<string> {
        try {
            if (data)
                if ( data.fullName && data.dni && data.address && data.idCity && data.idSubject && data.idSchool) 
                    if (await this.existsTeacherByDni(data.dni)) {
                        throw new Error('The teacher already exists.')
                    } else {
                        let city: City = await this.cityService.getById(data.idCity)
                        let subject: Subject = await this.subjectService.getById(data.idSubject)
                        let school: School = await this.schoolService.getById(data.idSchool)
                        await this.teacherRepository.save(new Teacher( data.fullName, data.dni, data.address, city, subject, school));
                    }
                else
                    throw new Error('The data for creating a teacher is not valid');
            else
                throw new Error('There is no data to create a teacher');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }
    public async delete(id: number): Promise<string> {
        try {
            if (id)
                if (await this.existsTeacher(id)) {
                    await this.teacherRepository.delete(id);
                } else
                    throw new Error('The teacher was not found.')
            else
                throw new Error('There is no data to delete teachers');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }
    public async update(id: number, data: any): Promise<string> {
        try {
            if (data)
                if (data.idTeacher && data.fullName && data.dni && data.address && data.idCity && data.idSubject && data.idSchool) 
                    if (await this.existsTeacher(id)) {
                        let criteria: FindOneOptions = { where: { idTeacher: id } }
                        let teacher: Teacher = await this.teacherRepository.findOne(criteria);
                        let city: City = await this.cityService.getById(data.idCity);
                        let subject: Subject = await this.subjectService.getById(data.idSubject);
                        let school: School = await this.schoolService.getById(data.idSchool);
                        teacher.setFullName(data.fullName);
                        teacher.setDniTeacher(data.dni); 
                        teacher.setAddress(data.address);
                        teacher.setCity(city)
                        teacher.setSubject(subject)
                        teacher.setSchool(school)
                        await this.teacherRepository.save(teacher);
                    } else
                        throw new Error('The teacher was not found.')                    
                else
                    throw new Error('The data for modifying a teacher is not valid');
            else
                throw new Error('There is no data to modify teachers');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }

    private async existsTeacher(id: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { idTeacher: id } };
        let teacher: Teacher = await this.teacherRepository.findOne(criteria);
        return (teacher != null);
    }
    private async existsTeacherByDni(dni: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { dni: dni } };
        let teacher: Teacher = await this.teacherRepository.findOne(criteria);
        return (teacher != null);
    }
}
