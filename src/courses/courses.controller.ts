import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() courseDto: CreateCourseDto) {
    return this.coursesService.create(courseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(id);
    if(!course) throw new NotFoundException();
    return course;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatecourseDto: UpdateCourseDto) {
    const course = await this.coursesService.update(id, updatecourseDto);
    if(!course) throw new NotFoundException();
    return course;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const course = await this.coursesService.remove(id);
    if(!course) throw new NotFoundException();
  }
}
