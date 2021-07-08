import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

interface Config {
  NODE_ENV: string;
  PORT: number;
  AUTHORITY: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  SESSION_SECRET: string;
}

const CONFIG_KEYS = [
  'NODE_ENV',
  'PORT',
  'AUTHORITY',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
  'SESSION_SECRET',
];

// Uncomment if required.
// const OPTIONAL_KEYS = new Set([
// ]);

@Injectable()
export class ConfigService {
  public config: Config;

  constructor() {
    const conf = fs.existsSync('.env')
      ? dotenv.parse(fs.readFileSync('.env'))
      : process.env;
    this.config = CONFIG_KEYS.reduce((acc, key) => {
      // if (!conf[key] && !OPTIONAL_KEYS.has(key)) {
      //   throw new Error(`Env variable ${key} is not defined`);
      // }
      acc[key] = conf[key];
      return acc;
    }, {} as any);
  }
}
