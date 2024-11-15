import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create({
      usr_name: user.nome,
      usr_email: user.email,
      usr_password: user.senha,
      usr_user_type: user.tipoUsuario,
      usr_creation_date: user.dataCriacao || new Date(),
    });

    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateData: Partial<User> = {
      ...(updateUserDto.nome && { usr_name: updateUserDto.nome }),
      ...(updateUserDto.email && { usr_email: updateUserDto.email }),
      ...(updateUserDto.senha && { usr_password: updateUserDto.senha }),
      ...(updateUserDto.datanascimento && {
        usr_creation_date: new Date(updateUserDto.datanascimento),
      }),
    };
    await this.usersRepository.update(Number(id), updateData);
    return this.usersRepository.findOne({ where: { usr_id: Number(id) } });
  }

  async remove(id: string) {
    // Converte o ID da string para número
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new Error(`Invalid ID: ${id}`); // Se o ID não for válido, lança um erro
    }
    const userToRemove = await this.usersRepository.findOne({ where: { usr_id: userId } });
    if (!userToRemove) {
      return null;
    }
    await this.usersRepository.remove(userToRemove);
    return userToRemove;
  }
}
