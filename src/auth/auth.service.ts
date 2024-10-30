import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

export interface AuthResult {
    access_token: string
}

@Injectable()
export class AuthService {
    constructor(
        public readonly usersService: UsersService,
        public readonly jwtService: JwtService
    ) { }

    async signIn(username: string, password: string): Promise<AuthResult> {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) {
            throw new UnauthorizedException("Usuário ou senha incorretos");
        }

        const { id: sub, email } = user

        return {
            access_token: await this.jwtService.signAsync({ sub, email })
        }
    }
}
