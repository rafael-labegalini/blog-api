import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './DTO/users.dto';
import { PasswordService } from '../auth/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>,
    public readonly passwordService: PasswordService,
  ) {}

  async create(data: UserDTO): Promise<User> {
    const user = this.usersRepository.create(data);
    user.password = await this.passwordService.hashPassword(data.password);

    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
