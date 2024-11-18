import { Body, Controller, Post, Get, Param, Put, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './user.dto';  // Removido o FindAllParameters

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() user: UsersDto): Promise<UsersDto> {
        return await this.userService.create(user);
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Get()
    async findAll(@Query('filter') filter: string = ''): Promise<UsersDto[]> {  // Removido o FindAllParameters
        return await this.userService.findAll(filter);  // Passando o filtro diretamente
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() user: UsersDto) {
        await this.userService.update(id, user);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
}
