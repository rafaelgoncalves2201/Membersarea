import { IsDateString, IsString, IsUUID } from "class-validator";

export class CreateCourseDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsUUID()
    admin_id: string;

    @IsString()
    cover_url: string;
}
