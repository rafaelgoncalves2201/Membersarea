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
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Course, Lesson, Progress, Attendance],
      synchronize: true, // Isso deve criar as tabelas automaticamente
      logging: true,
    }),
    UsersModule,
    // Outros módulos
  ],
})
export class AppModule {}
