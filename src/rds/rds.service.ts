import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PGClient } from './core/pg.client';

@Injectable()
export class RDSService implements OnModuleInit {
  private pgClient: PGClient;

  constructor(configService: ConfigService) {
    this.pgClient = new PGClient(configService);
  }

  async onModuleInit(): Promise<void> {
    await this.pgClient.authenticate();
  }

  getPGClient(): PGClient {
    return this.pgClient;
  }
}
