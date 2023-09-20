import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository , FindManyOptions} from 'typeorm';
import { CityDTO } from './dto/city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
    private cities: City[] = [];

    constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) {}

    public async getAll(): Promise<City[]> {
        try {
            const criteria: FindManyOptions = { relations: ['schools'] }
            this.cities = await this.cityRepository.find(criteria);
            if (this.cities)
                return this.cities;
            else
                throw new Error('No cities found.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Search error: ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getById(id: number): Promise<City> {
        try {
            const criteria: FindOneOptions = { relations: ['schools'], where: { idCity: id } }
            let city: City = await this.cityRepository.findOne(criteria);
            if (!city)
                throw new Error('City not found.')
            return city;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'City search error ' + id + ' : ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async add(data: CityDTO): Promise<string> {
        try {
            if (data)
                if ( data.name)
                    if (await this.cityExistsByName(data.name)) {
                        throw new Error('City already exists.')
                    } else {
                        await this.cityRepository.save(new City( data.name));
                    }
                else
                    throw new Error(`${data}`);
            else
                throw new Error('No data to create a city');
            return "ok";
        } catch (error) {
            return error.message;
        }
    }

    public async delete(id: number): Promise<string> {
        try {
            if (id)
                if (await this.cityExists(id)) {
                    await this.cityRepository.delete(id);
                } else
                    throw new Error('City not found.')
            else
                throw new Error('No data to delete cities');
            return "ok";
        } catch (error) {
            return error.message;
        }
    }

    public async update(id: number, data: CityDTO): Promise<string> {
        try {
            if (data)
                if (data.name)
                    if (await this.cityExists(id)) {
                        let criteria: FindOneOptions = { where: { idCity: id } }
                        let city: City = await this.cityRepository.findOne(criteria);
                        city.setName(data.name);
                        await this.cityRepository.save(city);
                    } else
                        throw new Error('City not found.')
                else
                    throw new Error('Invalid data for modifying a city');
            else
                throw new Error('No data to modify cities');
            return "ok";
        } catch (error) {
            return error.message;
        }
    }

    private async cityExists(id: number): Promise<boolean> {
        let criteria: FindOneOptions = { where: { idCity: id } };
        let city: City = await this.cityRepository.findOne(criteria);
        return (city != null);
    }

    private async cityExistsByName(name:string): Promise<boolean> {
        let criteria: FindOneOptions = { where: { name : name } };
        let city: City = await this.cityRepository.findOne(criteria);
        return (city != null);
    }
}
