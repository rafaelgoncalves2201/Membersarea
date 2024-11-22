import { IsBoolean, IsDateString, IsString, IsUUID } from "class-validator";

export class CreateAttendanceDto {

    @IsString()
    @IsUUID()
    student_id: string;

    @IsString()
    @IsUUID()
    lesson_id: string;

    @IsBoolean()
    present: boolean;

    @IsDateString()
    date: Date;
}
