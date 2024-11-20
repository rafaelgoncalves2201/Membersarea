import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
  @InjectRepository(Course)
  private readonly repository: Repository<Course>
){

}
  create(courseDto: CreateCourseDto) {
    const course = this.repository.create(courseDto);
    return this.repository.save(course);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, courseDto: UpdateCourseDto) {
    const course = await this.repository.findOneBy({ id });
    if(!course) return null;
    this.repository.merge(course, courseDto);
    return this.repository.save(course);
  }

  async remove(id: string) {
    const course = await this.repository.findOneBy({ id });
    if (!course) return null;
    return this.repository.remove(course);
  }
}
