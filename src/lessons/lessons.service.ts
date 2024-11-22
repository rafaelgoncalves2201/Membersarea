import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly repository: Repository<Lesson>
  ){

  }
  create(lessonDto: CreateLessonDto) {
    const course = this.repository.findOneBy({ id: lessonDto.course_id });
    if (!course){
      throw new BadRequestException('Invalid course ID');
    }
    const lesson = this.repository.create({ ...lessonDto });
    return this.repository.save(lesson);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, lessonDto: UpdateLessonDto) {
    const lesson = await this.repository.findOneBy({ id });
    if(!lesson) return null;
    this.repository.merge(lesson, lessonDto);
    return this.repository.save(lesson);
  }

  async remove(id: string) {
    const lesson = await this.repository.findOneBy({ id });
    if (!lesson) return null;
    return this.repository.remove(lesson);
  }
}
