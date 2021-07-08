import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import User from 'src/entities/User';
import { LoginDTO } from 'src/models/dto/LoginDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async autheticate(dto: LoginDTO): Promise<User | null> {
    const { password, username } = dto;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      return null;
    }
    const hash = bcrypt.hashSync(password, user.salt);
    return user.password === hash ? user : null;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user || null;
  }
}
