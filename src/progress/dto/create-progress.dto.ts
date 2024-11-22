import { IsDateString, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { Double } from "typeorm";

export class CreateProgressDto {

    @IsString()
    @IsUUID()
    stdent_id: string;

    @IsString()
    @IsUUID()
    course_id: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    percentage: Double;

    @IsDateString()
    update_date: Date;
}
