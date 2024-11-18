import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressDto } from './progress.dto';
import { ProgressEntity } from '../db/entities/progress.entity';

@Injectable()
export class ProgressService {
    constructor(
        @InjectRepository(ProgressEntity)
        private progressRepository: Repository<ProgressEntity>,
    ) {}

    // Método create ajustado para usar o objeto completo
    async create(newProgress: ProgressDto): Promise<ProgressEntity> {
        // Cria uma nova instância de ProgressEntity com os dados de ProgressDto
        const progress = this.progressRepository.create(newProgress);
        return this.progressRepository.save(progress);
    }

    async findById(id: string): Promise<ProgressEntity> {
        const progress = await this.progressRepository.findOne({ where: { id } });

        if (!progress) {
            throw new ConflictException(`Progress with ID '${id}' not found`);
        }

        return progress;
    }

    async findAll(): Promise<ProgressEntity[]> {
        return this.progressRepository.find();
    }

    async update(id: string, updateData: Partial<ProgressDto>): Promise<ProgressEntity> {
        const progress = await this.findById(id);

        // Atualiza o objeto progress com os novos dados
        Object.assign(progress, updateData);
        return this.progressRepository.save(progress);
    }

    async remove(id: string): Promise<void> {
        const progress = await this.findById(id);
        await this.progressRepository.remove(progress);
    }
}
