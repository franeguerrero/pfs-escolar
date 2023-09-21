import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { School } from './entities/school.entity';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      School,
      Subject,
      City
    ])
  ],
  controllers: [SchoolController],
  providers: [SchoolService, CityService]
})
export class SchoolModule {}
