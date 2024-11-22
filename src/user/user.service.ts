import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSyc } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {

  }
  create(userDto: CreateUserDto) {
    userDto.usr_password = bcryptHashSyc(userDto.usr_password);
    if(!['admin', 'user', 'student'].includes(userDto.usr_user_type)){
      throw new BadRequestException('Invalid user type');
    }
    const user = this.repository.create(userDto);
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, userDto: UpdateUserDto) {
    userDto.usr_password = bcryptHashSyc(userDto.usr_password);
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    this.repository.merge(user, userDto);
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    return this.repository.remove(user);
  }

  findByEmail(usr_email: string): Promise<User | null> {
    return this.repository.findOneBy({ usr_email });
  }
}
