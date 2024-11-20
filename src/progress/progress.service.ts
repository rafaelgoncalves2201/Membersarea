import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly repository: Repository<Progress>
  ){

  }
  create(progressDto: CreateProgressDto) {
    const progress = this.repository.create(progressDto);
    return this.repository.save(progress);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, progressDto: UpdateProgressDto) {
    const progress = await this.repository.findOneBy({ id });
    if (!progress) return null;
    this.repository.merge(progress, progressDto);
    return this.repository.save(progress);
  }

  async remove(id: string) {
    const progress = await this.repository.findOneBy({ id });
    if (!progress) return null;
    return this.repository.remove(progress);
  }
}
