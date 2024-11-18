import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressModule } from './progress/progress.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), 
  DbModule,
  UsersModule,
  AttendanceModule,
  LessonsModule,
  ProgressModule,
  CoursesModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
