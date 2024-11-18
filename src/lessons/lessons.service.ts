import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonsDto } from './lessons.dto';
import { LessonsEntity } from '../db/entities/lessons.entity';

@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(LessonsEntity)
        private lessonsRepository: Repository<LessonsEntity>,
    ) {}

    // Corrigindo o método create para usar a entidade completa
    async create(newLesson: LessonsDto): Promise<LessonsEntity> {
        // Agora criamos a entidade corretamente a partir de newLesson
        const lesson = this.lessonsRepository.create(newLesson); 
        return this.lessonsRepository.save(lesson);
    }

    async findById(id: string): Promise<LessonsEntity> {
        const lesson = await this.lessonsRepository.findOne({ where: { id } });

        if (!lesson) {
            throw new ConflictException(`Lesson with ID '${id}' not found`);
        }

        return lesson;
    }

    async findAll(): Promise<LessonsEntity[]> {
        return this.lessonsRepository.find();
    }

    async update(id: string, updateData: Partial<LessonsDto>): Promise<LessonsEntity> {
        const lesson = await this.findById(id);

        Object.assign(lesson, updateData);
        return this.lessonsRepository.save(lesson);
    }

    async remove(id: string): Promise<void> {
        const lesson = await this.findById(id);
        await this.lessonsRepository.remove(lesson);
    }
}
