import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(courseDto: CreateCourseDto) {

    const admin = await this.repository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.admin', 'admin')
      .where('course.admin_id = :admin_id', { admin_id: courseDto.admin_id })
      .andWhere('admin.user_type = :user_type', { user_type: 'admin' })
      .getOne();

    if (!admin) {
      throw new BadRequestException('Only admins can create courses.');
    }

    const course = this.repository.create({ ...courseDto, admin_id: admin.id });
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
