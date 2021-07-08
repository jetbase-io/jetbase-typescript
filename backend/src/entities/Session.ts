import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { SessionPayload } from 'src/models/SessionPayload';
import { EXPIRATION } from 'src/constants/session';

@Entity('sessions')
export default class Session {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: 'jsonb' })
  readonly payload: SessionPayload;

  @Column()
  readonly expire: Date;

  private constructor(id: string, payload: SessionPayload, expire: Date) {
    this.id = id;
    this.payload = payload;
    this.expire = expire;
  }

  public static create(payload: SessionPayload): Session {
    const expire = new Date(Date.now() + EXPIRATION);
    return new Session(uuidV4(), payload, expire);
  }
}
