import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly repository: Repository<Progress>
  ){}

  async create(progressDto: CreateProgressDto) {
    const student = await this.repository
      .createQueryBuilder('progress')
      .innerJoin('progress.student', 'student')
      .where('student.id = :studentId', { studentId: progressDto.stdent_id })
      .getOne();
    if (!student) {
      throw new BadRequestException('Invalid student ID');
    }

    const course = await this.repository
      .createQueryBuilder('progress')
      .innerJoin('progress.course', 'course')
      .where('course.id = :courseId', { courseId: progressDto.course_id })
      .getOne();
  
    if (!course) {
      throw new BadRequestException('Invalid course ID');
    }

    const progress = this.repository.create({
      ...progressDto,
      student: student.student,
      course: course.course,
    });
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
