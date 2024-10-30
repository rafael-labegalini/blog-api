import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        public readonly usersRepository: Repository<User>
    ) { }

    async findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }
}
