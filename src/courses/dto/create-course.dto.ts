import { IsDateString, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    admin_id: string;

    @IsDateString()
    creation_date: Date;

    @IsString()
    cover_url: string;
}
