import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { RDSModelBuilder } from './rds.builder.model';

export class PGClient {
  private sequelize: Sequelize;
  private rdsModelBuilder: RDSModelBuilder;

  /**
   * Initiate config and start authenticate DB
   * @param configService a config service with value from .env
   */
  constructor(private configService: ConfigService) {
    const dbConfig = this.configService.get('PG_DB_CONFIG');
    this.sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.dbuser,
      dbConfig.password,
      {
        host: dbConfig.host,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      },
    );

    // this.authenticate();
  }

  /**
   * Authenticate DB for starting a connection
   */
  async authenticate() {
    try {
      await this.sequelize.authenticate();
      // this.rdsModelBuilder = new RDSModelBuilder(this.sequelize);
      Logger.log(
        'PG Connection has been established successfully.',
        PGClient.name,
      );
    } catch (err) {
      Logger.error(err, err.stack, PGClient.name);
    }
  }

  getConfiguration(): string {
    return this.configService.get('PG_DB_CONFIG');
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }

  getModelBuilder(): RDSModelBuilder {
    return new RDSModelBuilder(this.sequelize);
  }
}
