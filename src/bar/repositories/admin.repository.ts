import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { BaseRepository } from 'src/rds/core/base.repository';
import { RDSService } from 'src/rds/rds.service';

@Injectable()
export class AdminRepository extends BaseRepository {
  private adminModel: ModelCtor<Model>;

  constructor(private rdsService: RDSService) {
    super();
  }

  protected init() {
    this.adminModel = this.rdsService
      .getPGClient()
      .getModelBuilder()
      .define(
        'Admin',
        {
          // Model attributes are defined here
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
          },
          nick_name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
          },
        },
        'admin',
      );
    return this.adminModel;
  }

  // getUserModel(): ModelCtor<Model> {
  //   return this.adminModel;
  // }
}
