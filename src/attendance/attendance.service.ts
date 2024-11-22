import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(attendanceDto: CreateAttendanceDto) {

    const student = await this.repository.findOneBy({ id: attendanceDto.student_id })
    if (!student){
      throw new BadRequestException('Invalid student ID');
    }
    const lesson = this.repository.create({ id: attendanceDto.lesson_id });
    if (!lesson){
      throw new BadRequestException('Invalid student ID');
    }
    const attendance = this.repository.create(attendanceDto);
    return this.repository.save(attendance);
  }

  findAll() {
    return this.repository.find({
      relations: ['student', 'lesson'],
    });
  }

  async findOne(id: string) {
    const attendance = await this.repository.findOne({
      where: { id },
      relations: ['student', 'lesson'],
    });
    if (!attendance) throw new NotFoundException('Attendance not found');
    return attendance;
  }

  async update(id: string, attendanceDto: UpdateAttendanceDto) {
    const attendance = await this.repository.findOneBy({ id });
    if (!attendance) throw new NotFoundException('Attendance not found');
    this.repository.merge(attendance, attendanceDto);
    return this.repository.save(attendance);
  }

  async remove(id: string) {
    const attendance = await this.repository.findOneBy({ id });
    if (!attendance) throw new NotFoundException('Attendance not found');
    return this.repository.remove(attendance);
  }
}
