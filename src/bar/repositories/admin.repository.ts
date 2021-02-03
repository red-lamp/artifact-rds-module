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
  }

  // getUserModel(): ModelCtor<Model> {
  //   return this.userModel;
  // }

  findAll(attributes?: any): Promise<Model[]> {
    return this.adminModel.findAll(attributes);
  }

  insert(data: any, fields?: any): Promise<Model> {
    return this.adminModel.create(data, fields);
  }

  update(data: any, where: any): Promise<[number, Model[]]> {
    return this.adminModel.update(data, where);
  }

  delete(where: any): Promise<number> {
    return this.adminModel.destroy(where);
  }
}
