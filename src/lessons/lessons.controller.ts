import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    // Verifica se o curso associado existe
    try {
      return await this.lessonsService.create(createLessonDto);
    } catch (error) {
      throw new NotFoundException('Course not found');
    }
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const lesson = await this.lessonsService.findOne(id);
    if(!lesson) throw new NotFoundException();
    return lesson;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonsService.update(id, updateLessonDto);
    if(!lesson) throw new NotFoundException();
    return lesson;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const lesson = await this.lessonsService.remove(id);
    if(!lesson) throw new NotFoundException();
  }
}
