import { IsString, IsUUID } from "class-validator";

export class CreateLessonDto {

    @IsString()
    @IsUUID()
    course_id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;
    
    @IsString()
    video_url: string;

    @IsString()
    extra_material: string;
}
