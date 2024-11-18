import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProgressEntity } from './entities/progress.entity';
import { UserEntity } from './entities//user.entity';
import { LessonsEntity } from './entities/lessons.entity';
import { CoursesEntity } from './entities/courses.entity';
import { AttendanceEntity } from './entities/attendance.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [ProgressEntity, UserEntity, LessonsEntity, CoursesEntity, AttendanceEntity ],
  migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
