import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}
    @UseGuards(AuthGuard)
    @Get(':id')
    private listOne(@Param('id') id: number): Student | any {
        return this.studentService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    private listAll(): Student[] | any {
        return this.studentService.getAll();
    }
    @UseGuards(AuthGuard)
    @Post()
    private add(@Body() data: StudentDTO): Student[] | any {
        return this.studentService.add(data);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    private delete(@Param('id') id: number): Student[] | any {
        return this.studentService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    private update(@Param('id') id: number, @Body() data: any): Student[] | any {
        return this.studentService.update(id, data)
    }
}
