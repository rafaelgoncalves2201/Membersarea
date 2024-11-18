import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsEntity } from '../db/entities/lessons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonsEntity])],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
