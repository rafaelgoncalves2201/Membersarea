import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { ProgressEntity } from '../db/entities/progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressEntity])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
