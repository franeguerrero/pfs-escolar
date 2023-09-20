import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { SubjectDTO } from './dto/subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
    private subjects: Subject[] = [];

    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
    ) { }

    public async getAll(): Promise<Subject[]> {
        try {
            const criteria:FindManyOptions = {relations: ['teacher', 'teacher.school']}
            this.subjects = await this.subjectRepository.find(criteria);
            return this.subjects;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Error in search: ' + error,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    public async getById(id: number): Promise<Subject> {
        try {
            const criteria: FindOneOptions = {
                relations: [ 'teacher', 'teacher.school'],
                where: { idSubject: id },
            };
            let subject: Subject = await this.subjectRepository.findOne(criteria);
            if (!subject) 
                throw new Error('Subject not found.');
            return subject;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Error in search for subject ' + id + ' : ' + error,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    public async add(data: SubjectDTO): Promise<string> {
        try {
            let subject: Subject;
            if (data)
                if (data.name) {
                    if (await this.subjectExistsByName(data.name)) {
                        throw new Error('Subject already exists');
                    } else {
                        subject = new Subject(data.name);
                        await this.subjectRepository.save(subject);
                    }
                } else throw new Error('Data to create subject is invalid');
            else throw new Error('No data to create subject');
            return 'ok';
        } catch (error) {
            return error.message;
        }
    }

    public async delete(id: number): Promise<string> {
        try {
            if (id)
                if (await this.subjectExists(id)) {
                    await this.subjectRepository.delete(id);
                } else throw new Error('The subject was not found.');
            else throw new Error('No data to delete subjects');
            return 'ok';
        } catch (error) {
            return error.message;
        }
    }

    public async update(id: number, data: SubjectDTO): Promise<string> {
        try {
            if (data)
                if (id && data.name)
                    if (await this.subjectExists(id)) {
                        let criteria: FindOneOptions = { where: { idSubject: id } };
                        let subject: Subject = await this.subjectRepository.findOne(
                            criteria,
                        );
                        subject.setName(data.name);
                        await this.subjectRepository.save(subject);
                    } else throw new Error('The subject was not found.');
                else throw new Error('Data to modify subject is invalid');
            else throw new Error('No data to modify subjects');
            return 'ok';
        } catch (error) {
            return error.message;
        }
    }

    private async subjectExists(id: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { idSubject: id } };
        let subject: Subject = await this.subjectRepository.findOne(criteria);
        return subject != null;
    }
    private async subjectExistsByName(name: string): Promise<boolean> {
        let criteria: FindOneOptions = { where: { name: name } };
        let subject: Subject = await this.subjectRepository.findOne(criteria);
        return subject != null;
    }
}
