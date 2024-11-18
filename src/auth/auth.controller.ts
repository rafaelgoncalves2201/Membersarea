import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(
    @Body('email') usr_EMAIL: string,
    @Body('password') usr_PASS: string,
    ): Promise<AuthResponseDto> {
        return this.authService.singIn(usr_EMAIL, usr_PASS);
    }
}
