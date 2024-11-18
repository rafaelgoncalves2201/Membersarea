import { Body, Controller, Post, Get, Param, Put, Query, Delete } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressDto } from './progress.dto';

@Controller('progress')
export class ProgressController {
    constructor(private readonly progressService: ProgressService) {}

    @Post()
    async create(@Body() progress: ProgressDto): Promise<ProgressDto> {
        return await this.progressService.create(progress);
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        return await this.progressService.findById(id);
    }

    @Get()
    async findAll(@Query() params: any): Promise<ProgressDto[]> {
        // Se você tiver parâmetros específicos para busca, use uma interface ou tipo apropriado para 'params'
        return await this.progressService.findAll(params);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() progress: ProgressDto) {
        // Usando o ID diretamente, já que não precisamos de ProgressRouteParameters
        await this.progressService.update(id, progress);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        // Usando o ID diretamente para remoção
        return await this.progressService.remove(id);
    }
}
