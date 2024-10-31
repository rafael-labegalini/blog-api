import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';

export interface AuthResult {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    public readonly usersService: UsersService,
    public readonly jwtService: JwtService,
    public readonly passwordService: PasswordService,
  ) {}

  async signIn(username: string, password: string): Promise<AuthResult> {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    if (
      !(await this.passwordService.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const { id: sub, email } = user;

    return {
      access_token: await this.jwtService.signAsync({ sub, email }),
    };
  }
}
