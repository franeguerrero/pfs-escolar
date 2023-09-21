import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { School } from './entities/school.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';

@Injectable()
export class SchoolService {
    private schools: School[] = [];
    
    constructor (@InjectRepository(School) private readonly schoolRepository: Repository<School>, private readonly cityService: CityService) {}

    public async getAll(): Promise<School[]> {
        try {
            const criteria: FindManyOptions = { relations: [ 'city', "teachers", "teachers.subject" ] }
            this.schools = await this.schoolRepository.find(criteria);        
            return this.schools;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Search error: ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getById(id: number): Promise<School> {
        try {
            const criteria: FindOneOptions = { relations: [ 'city', 'teachers','teachers.subject' ], where: { idSchool: id } }
            let school: School = await this.schoolRepository.findOne(criteria);
            if (!school) 
                throw new Error('School not found.')
            return school;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error searching for school ' + id + ' : ' + error 
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async add(data: any): Promise<string> {
        try {
            if (data)
                if ( data.name && data.address && data.idCity) 
                    if (await this.schoolExistsByData(data.name, data.address)) {
                        throw new Error('The school already exists.')
                    } else {
                        let city: City =  await this.cityService.getById(data.idCity)
                        await this.schoolRepository.save(new School( data.name, data.address, city));
                    }
                else
                    throw new Error('Invalid data for creating a school');
            else
                throw new Error('No data to create a school');
            return "ok";
        } catch (error) {
            return error.message;            
        }       
    }

    public async delete(id: number): Promise<string> {
        try {
            if (id)
                if (await this.schoolExists(id)) {
                    await this.schoolRepository.delete(id);
                } else
                    throw new Error('School not found.')
            else
                throw new Error('No data to delete schools');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }

    public async update(id: number, data: any): Promise<string> {
        try {
            if (data)
                if (data.idSchool && data.name && data.address && data.idCity) 
                    if (await this.schoolExists(id)) {
                        let criteria: FindOneOptions = { where: { idSchool: id } }
                        let school: School = await this.schoolRepository.findOne(criteria);
                        let city: City =  await this.cityService.getById(data.idCity)
                        school.setName(data.name);
                        school.setAddress(data.address);
                        school.setCity(city);
                        await this.schoolRepository.save(school);
                    } else
                        throw new Error('School not found.')                    
                else
                    throw new Error('Invalid data for modifying a school');
            else
                throw new Error('No data to modify schools');
            return "ok";
        } catch (error) {
            return error.message;            
        }
    }

    private async schoolExists(id: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { idSchool: id } };
        let school: School = await this.schoolRepository.findOne(criteria);
        return (school != null);
    }

    private async schoolExistsByData(name: string, address: string): Promise<boolean> {
        let criteria: FindOneOptions = { where: { name: name , address: address} };
        let school: School = await this.schoolRepository.findOne(criteria);
        return (school != null);
    }
}
