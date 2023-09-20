import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { SubjectService } from 'src/subject/subject.service';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Subject,
      City,
      Teacher,
      School
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService, CityService, TeacherService, SubjectService, SchoolService]
})
export class StudentModule {}

