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
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(Number(id), updateUserDto);
    return this.usersRepository.findOne({ where: { usr_id: Number(id) } });
  }

  async remove(id: string) {
    const userToRemove = await this.usersRepository.findOne({ where: { usr_id: Number(id) } });
    if (userToRemove) {
      await this.usersRepository.remove(userToRemove);
      return userToRemove;
    }
    return null; // Usuário não encontrado
  }
}
