import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const attendance = await this.attendanceService.findOne(id);
    if(!attendance) throw new NotFoundException();
    return attendance;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.attendanceService.update(id, updateAttendanceDto);
    
    if(!attendance) throw new NotFoundException();
    return attendance;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const attendance = await this.attendanceService.remove(id);
    if(!attendance) throw new NotFoundException();
  }
}
