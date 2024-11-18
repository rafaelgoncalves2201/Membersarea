import { IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
  

export class CoursesDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MaxLength(256)
  title: string;

  @IsString()
  @MaxLength(512)
  description: string;

  @IsUUID()
  admin_id: string;

  @IsDateString()
  creation_date: Date;

  @IsString()
  @MaxLength(512)
  cover_url: string;
}

export class UsersRouteParameters {
  @IsUUID()
  id: string;
}
