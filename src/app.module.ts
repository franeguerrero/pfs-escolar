import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { SchoolModule } from './school/school.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-black-snow-52283976.us-east-1.postgres.vercel-storage.com',
      port: 5432,
      username: 'default',
      password: 'r7UEntxHC5JQ',
      database: 'verceldb',
      entities: [
        join(__dirname, '**/entities', '*.entity.{ts,js}'),
      ],
      synchronize: true,
      ssl: true
    }),
    CityModule,
    TeacherModule,
    StudentModule,
    SubjectModule,
    SchoolModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
