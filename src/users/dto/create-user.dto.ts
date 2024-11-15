import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  tipoUsuario: string;

  dataCriacao: Date;
}
