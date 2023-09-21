import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from './entities/subject.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Student,
      Subject
    ])
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
