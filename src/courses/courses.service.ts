import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesDto } from './courses.dto';
import { CoursesEntity } from '../db/entities/courses.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CoursesEntity)
        private coursesRepository: Repository<CoursesEntity>,
    ) {}

    async create(newCourse: CoursesDto): Promise<CoursesEntity> {
        const course = this.coursesRepository.create(newCourse);
        return this.coursesRepository.save(course);
    }

    async findById(id: string): Promise<CoursesEntity> {
        const course = await this.coursesRepository.findOne({ where: { id } });

        if (!course) {
            throw new ConflictException(`Course with ID '${id}' not found`);
        }

        return course;
    }

    async findAll(): Promise<CoursesEntity[]> {
        return this.coursesRepository.find(); // Retorna todos os cursos sem parâmetros adicionais
    }

    async update(id: string, updateData: Partial<CoursesDto>): Promise<CoursesEntity> {
        const course = await this.findById(id);

        Object.assign(course, updateData);
        return this.coursesRepository.save(course);
    }

    async remove(id: string): Promise<void> {
        const course = await this.findById(id);
        await this.coursesRepository.remove(course);
    }
}