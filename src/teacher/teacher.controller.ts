import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherDTO } from './dto/teacher.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService) {}
    @UseGuards(AuthGuard)
    @Get(':id')
    private listOne(@Param('id') id: number): Teacher | any {
        return this.teacherService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    private listAll(): Teacher[] | any {
        return this.teacherService.getAll();
    }
    @UseGuards(AuthGuard)
    @Post()
    private add(@Body() data: TeacherDTO): Teacher[] | any {
        return this.teacherService.add(data);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    private delete(@Param('id') id: number): Teacher[] | any {
        return this.teacherService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    private update(@Param('id') id: number, @Body() data: any): Teacher[] | any {
        return this.teacherService.update(id, data);
    }
}
