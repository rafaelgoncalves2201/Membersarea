import { Controller, Post, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Post()
    create(@Body() attendance: AttendanceDto): AttendanceDto {
        return this.attendanceService.create(attendance);
    }

    @Get()
    findAll(): AttendanceDto[] {
        return this.attendanceService.findAll(); // Não há parâmetros adicionais aqui
    }

    @Get('/:id')
    findOne(@Param('id') id: number): AttendanceDto | undefined {
        return this.attendanceService.findOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() updateAttendance: Partial<AttendanceDto>): AttendanceDto | undefined {
        return this.attendanceService.update(id, updateAttendance);
    }

    @Delete('/:id')
    remove(@Param('id') id: number): boolean {
        return this.attendanceService.remove(id);
    }
}
