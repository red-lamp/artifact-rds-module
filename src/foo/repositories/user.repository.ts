import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { BaseRepository } from 'src/rds/core/base.repository';
import { RDSService } from 'src/rds/rds.service';

@Injectable()
export class UserRepository extends BaseRepository {
  private userModel: ModelCtor<Model>;

  constructor(private rdsService: RDSService) {
    super();
  }

  protected init() {
    this.userModel = this.rdsService
      .getPGClient()
      .getModelBuilder()
      .define(
        'User',
        {
          // Model attributes are defined here
          first_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          last_name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
          },
        },
        'user',
      );
  }

  // getUserModel(): ModelCtor<Model> {
  //   return this.userModel;
  // }

  findAll(attributes?: any): Promise<Model[]> {
    return this.userModel.findAll(attributes);
  }

  insert(data: any, fields?: any): Promise<Model> {
    return this.userModel.create(data, fields);
  }

  update(data: any, where: any): Promise<[number, Model[]]> {
    return this.userModel.update(data, where);
  }

  delete(where: any): Promise<number> {
    return this.userModel.destroy(where);
  }
}
