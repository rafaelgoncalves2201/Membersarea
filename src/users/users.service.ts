import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './user.dto';
import { UserEntity } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    // Função auxiliar para converter UserEntity em UsersDto
    private toDto(user: UserEntity): UsersDto {
        return {
            usr_ID: user.usr_ID,
            usr_EMAIL: user.usr_EMAIL,
            usr_NAME: user.usr_NAME,
            usr_USER_TYPE: user.usr_USER_TYPE,
            usr_CREATION_DATE: user.usr_CREATION_DATE,
        };
    }

    // Método para criar um novo usuário
    async create(newUser: UsersDto): Promise<UsersDto> {
        if (!newUser.usr_PASS) {
            throw new ConflictException('Password is required');
        }

        const userAlreadyRegistered = await this.findByUserEmail(newUser.usr_EMAIL);

        if (userAlreadyRegistered) {
            throw new ConflictException(
                `User '${newUser.usr_EMAIL}' already registered`,
            );
        }

        const dbUser = new UserEntity();
        dbUser.usr_EMAIL = newUser.usr_EMAIL;
        dbUser.passwordHash = await bcrypt.hash(newUser.usr_PASS, 10);  // Usando bcrypt async

        const savedUser = await this.usersRepository.save(dbUser);
        return this.toDto(savedUser);
    }

    // Método para buscar usuário por email
    async findByUserEmail(usr_EMAIL: string): Promise<UsersDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { usr_EMAIL },
        });

        if (!userFound) {
            return null;
        }

        return this.toDto(userFound);
    }

    // Método para buscar usuário por ID
    async findById(usr_ID: string): Promise<UsersDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { usr_ID },
        });

        if (!userFound) {
            return null;
        }

        return this.toDto(userFound);
    }

    // Método para listar todos os usuários com parâmetros (paginados ou filtrados)
    async findAll(filter: string = '', page: number = 1, limit: number = 10): Promise<UsersDto[]> {
        const usersQuery = this.usersRepository.createQueryBuilder('user');

        // Filtro opcional pelo email ou nome
        if (filter) {
            usersQuery.where('user.usr_EMAIL LIKE :filter OR user.usr_NAME LIKE :filter', {
                filter: `%${filter}%`,
            });
        }

        // Paginação
        usersQuery.skip((page - 1) * limit).take(limit);

        const users = await usersQuery.getMany();

        return users.map(this.toDto);
    }

    // Método para atualizar um usuário (PUT)
    async update(id: string, updatedData: Partial<UsersDto>): Promise<UsersDto> {
        const user = await this.usersRepository.findOne({ where: { usr_ID: id } });

        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }

        // Verifica se o novo email já está sendo usado por outro usuário
        if (updatedData.usr_EMAIL && updatedData.usr_EMAIL !== user.usr_EMAIL) {
            const emailExists = await this.findByUserEmail(updatedData.usr_EMAIL);
            if (emailExists) {
                throw new ConflictException(
                    `Email '${updatedData.usr_EMAIL}' is already in use`,
                );
            }
            user.usr_EMAIL = updatedData.usr_EMAIL; // Atualiza o email
        }

        // Atualiza a senha, se fornecida
        if (updatedData.usr_PASS) {
            user.passwordHash = await bcrypt.hash(updatedData.usr_PASS, 10); // Usando bcrypt async
        }

        // Atualiza o nome (se o campo for adicionado no DTO)
        if (updatedData.usr_NAME) {
            user.usr_NAME = updatedData.usr_NAME;
        }

        // Salva as alterações
        const updatedUser = await this.usersRepository.save(user);

        return this.toDto(updatedUser);
    }

    // Método para remover um usuário (DELETE)
    async remove(id: string): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { usr_ID: id } });

        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }

        await this.usersRepository.remove(user);
    }
}
