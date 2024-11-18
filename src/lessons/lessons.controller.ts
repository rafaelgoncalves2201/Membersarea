import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsDto } from './lessons.dto';

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {}

    @Post()
    async create(@Body() lesson: LessonsDto): Promise<LessonsDto> {
        return await this.lessonsService.create(lesson);
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        return await this.lessonsService.findById(id);
    }

    @Get()
    async findAll(): Promise<LessonsDto[]> {
        return await this.lessonsService.findAll(); // Não precisa de params
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() lesson: LessonsDto) {
        await this.lessonsService.update(id, lesson);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.lessonsService.remove(id);
    }
}
