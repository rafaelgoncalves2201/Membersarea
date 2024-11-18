import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProgressDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  student_id: string;

  @IsUUID()
  course_id: string;

  @IsString()
  percentage: string;

  @IsDateString()
  utdate_date: Date;
}

import { IsUUID } from 'class-validator';

export class UsersRouteParameters {
  @IsUUID()
  id: string;
}
