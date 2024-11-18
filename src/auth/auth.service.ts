import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private jwtExpirationTimeSeconds: number;
    
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeSeconds = +this.configService.get<number>(
            'JWT_EXPIRATION_TIME',
        );
    }

    async singIn(usr_EMAIL: string, usr_PASS: string): Promise<AuthResponseDto> {
        const foundUSer = await this.userService.findByUserEmail(usr_EMAIL);
        if(!foundUSer || !bcryptCompareSync(usr_PASS, foundUSer.usr_PASS)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUSer.usr_ID, usr_EMAIL: foundUSer.usr_EMAIL };

        const token = this.jwtService.sign(payload);
        return { token, expiresIn: this.jwtExpirationTimeSeconds };
    }
}
