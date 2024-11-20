import { IsDateString, IsNumber, IsString } from "class-validator";
import { Double } from "typeorm";

export class CreateProgressDto {

    @IsString()
    stdent_id: string;

    @IsString()
    course_id: string;

    @IsNumber()
    percentage: Double;

    @IsDateString()
    uodate_date: Date;
}
