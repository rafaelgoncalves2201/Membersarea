import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nome: string;
  email: string;
  senha: string;
  datanascimento: string;
}
