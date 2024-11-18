import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class AttendanceDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  student_id: string;

  @IsUUID()
  lesson_id: string;

  @IsOptional()
  presen: string;

  @IsDateString()
  date: Date;
}

export class AttendanceRouteParameters {
    @IsUUID()
    id: string;
  }