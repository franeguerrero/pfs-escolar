import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';
import { SubjectService } from 'src/subject/subject.service';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolService } from 'src/school/school.service';
import { School } from 'src/school/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ 
      Teacher,
      City,
      Subject,
      School,
      Student
     ])
  ],
  controllers: [TeacherController],
  providers: [TeacherService, CityService, SubjectService, SchoolService, StudentService]
})
export class TeacherModule {}
