import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Body() progressDto: CreateProgressDto) {
    return this.progressService.create(progressDto);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const progress = await this.progressService.findOne(id);
    if(!progress) throw new NotFoundException();
    return progress;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    const progress = await this.progressService.update(id, updateProgressDto);
    if(!progress) throw new NotFoundException();
    return progress;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const progress = await this.progressService.remove(id);
    if(progress) throw new NotFoundException();
  }
}
