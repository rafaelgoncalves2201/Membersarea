import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateAttendanceDto {

    @IsString()
    student_id: string;

    @IsString()
    lesson_id: string;

    @IsBoolean()
    present: boolean;

    @IsDateString()
    date: Date;
}
