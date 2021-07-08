import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Session from 'src/entities/Session';
import { SessionPayload } from 'src/models/SessionPayload';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(payload: SessionPayload) {
    const session = Session.create(payload);
    this.sessionRepository.save(session);
    return session;
  }

  async getById(id: string): Promise<Session | null> {
    let session = await this.sessionRepository.findOne({
      where: { id },
    });
    if (session && session.expire < new Date()) {
      await this.sessionRepository.remove(session);
      session = undefined;
    }
    return session || null;
  }
}
