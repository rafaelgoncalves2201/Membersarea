import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>
  ){

  }
  create(attendanceDto: CreateAttendanceDto) {
    const attendance = this.repository.create(attendanceDto);
    return this.repository.save(attendance);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, attendanceDto: UpdateAttendanceDto) {
    const attendance = await this.repository.findOneBy({ id });
    if(!attendance) return null;
    this.repository.merge(attendance, attendanceDto);
    return this.repository.save(attendance);
  }

  async remove(id: string) {
    const attendance = await this.repository.findOneBy({ id });
    if (!attendance) return null;
    return this.repository.remove(attendance);
  }
}
