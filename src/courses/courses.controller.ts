import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesDto } from './courses.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    async create(@Body() course: CoursesDto): Promise<CoursesDto> {
        return await this.coursesService.create(course);
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        return await this.coursesService.findById(id);
    }

    @Get()
    async findAll(): Promise<CoursesDto[]> {
        return await this.coursesService.findAll();
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() course: CoursesDto) {
        await this.coursesService.update(id, course);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.coursesService.remove(id);
    }
}
