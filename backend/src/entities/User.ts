import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/models/dto/UserDTO';

@Entity('users')
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly username: string;

  @Column()
  readonly password: string;

  @Column()
  readonly salt: string;

  @Column()
  readonly deleted: boolean;

  private constructor(
    id: string,
    username: string,
    hash: string,
    salt: string,
  ) {
    this.id = uuidV4();
    this.username = username;
    this.password = hash;
    this.salt = salt;
    this.deleted = false;
  }

  public static create(username: string, password: string): User {
    const id = uuidV4();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return new User(id, username, hash, salt);
  }

  toDTO(): UserDTO {
    return {
      username: this.username,
    };
  }
}
