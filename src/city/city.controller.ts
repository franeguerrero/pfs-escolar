import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CityDTO } from './dto/city.dto';
import { City } from './entities/city.entity';
import { CityService } from './city.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('city')
export class CityController {
    constructor(private cityService: CityService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    private listOne(@Param('id') id: number): City | any {
        return this.cityService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    private listAll(): City[] | any {
        return this.cityService.getAll();
    }
    @UseGuards(AuthGuard)
    @Post()
    private add(@Body() data: CityDTO): City | any {
        return this.cityService.add(data);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    private delete(@Param('id') id: number): City[] | any {
        return this.cityService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    private update(@Param('id') id: number, @Body() data: CityDTO): City[] | any {
        return this.cityService.update(id, data);
    }
}
