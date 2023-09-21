import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { School } from './entities/school.entity';
import { SchoolService } from './school.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('school')
export class SchoolController {
    constructor(private schoolService: SchoolService) {}
    @UseGuards(AuthGuard)
    @Get(':id')
    private listOne(@Param('id') id: number): School | any {
        return this.schoolService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    private listAll(): School[] | any {
        return this.schoolService.getAll();
    }
    @UseGuards(AuthGuard)
    @Post()
    private add(@Body() data: any): School | any {
        return this.schoolService.add(data);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    private delete(@Param('id') id: number): School[] | any {
        return this.schoolService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    private update(@Param('id') id: number, @Body() data: any): School[] | any {
        return this.schoolService.update(id, data);
    }
}
