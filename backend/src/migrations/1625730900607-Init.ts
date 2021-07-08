import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1625730900607 implements MigrationInterface {
  name = 'Init1625730900607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE users (id character varying NOT NULL, username character varying NOT NULL, password character varying NOT NULL, salt character varying NOT NULL, deleted boolean NOT NULL, CONSTRAINT PK_a3ffb1c0c8416b9fc6f907b7433 PRIMARY KEY (id))',
    );
    await queryRunner.query(
      'CREATE TABLE sessions (id varchar NOT NULL COLLATE "default", payload json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE sessions');
    await queryRunner.query('DROP TABLE users');
  }
}
