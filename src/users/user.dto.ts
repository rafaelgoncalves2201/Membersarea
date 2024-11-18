import { IsDateString, IsEmail, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UsersDto {
  @IsUUID()
  @IsOptional()
  usr_ID: string;

  @IsString()
  @MaxLength(255)
  usr_NAME: string;

  @IsEmail()
  @MaxLength(255)
  usr_EMAIL: string;

  @IsOptional()
  @IsString()
  usr_PASS?: string;

  @IsString()
  usr_USER_TYPE: string;

  @IsDateString()
  usr_CREATION_DATE: Date;
}

import { IsUUID } from 'class-validator';

export class UsersRouteParameters {
  @IsUUID()
  usr_ID: string;
}
