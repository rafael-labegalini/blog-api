import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';

@Controller()
export class AuthController {
    constructor(
        public readonly authService: AuthService
    ) { }

    @Post("login")
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(
            signInDto.email,
            signInDto.password
        );
    }
}
