import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class LessonsDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  course_id: string;

  @IsString()
  @MaxLength(512)
  description: string;

  @IsString()
  @MaxLength(512)
  video_url: string;

  @IsString()
  @MaxLength(512)
  extra_material: string;
}

export class UsersRouteParameters {
    @IsUUID()
    id: string;
  }