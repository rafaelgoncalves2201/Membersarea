import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Course } from './users/entities/course.entity';
import { Lesson } from './users/entities/lesson.entity';
import { Progress } from './users/entities/progress.entity';
import { Attendance } from './users/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'membersarea',
      username: 'postgres',
      password: '99622',
      entities: [User, Course, Lesson, Progress, Attendance],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
