import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileDto, SignInDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req: Request) {
    return req['user'];
  }

  @UseGuards(AuthGuard)
  @Post("profile")
  async updateProfile(@Body() data: ProfileDto, @Request() request: Request) {
    return await this.authService.updateProfile(data, request["user"]);
  }
}
