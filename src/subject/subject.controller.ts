import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SubjectDTO } from './dto/subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    private listOne(@Param('id') id: number): Subject | any {
        return this.subjectService.getById(id);
    }
    @UseGuards(AuthGuard)
    @Get()
    private listAll(): Subject[] | any {
        return this.subjectService.getAll();
    }
    @UseGuards(AuthGuard)
    @Post()
    private add(@Body() data: SubjectDTO): Subject[] | any {
        return this.subjectService.add(data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    private delete(@Param('id') id: number): Subject[] | any {
        return this.subjectService.delete(id);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    private update(@Param('id') id: number, @Body() data: SubjectDTO): Subject[] | any {
        return this.subjectService.update(id, data);
    }
}
