import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor, QueryTypes } from 'sequelize';
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
      .getRDSClient()
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
    return this.userModel;
  }

  queryRBPUser(options?: any): any {
    let queryFilter = '';
    if (options.where['uid__c']) {
      queryFilter += `WHERE uid__c = '${options.where.uid__c}'`;
    }

    return this.rdsService.getRDSClient().getSequelize().query(
      `SELECT * FROM salesforce.rbp_member__c 
      INNER JOIN (
        SELECT rbp_member_ref_id, image_url
        FROM public.user
      ) AS users ON users.rbp_member_ref_id = uid__c
      ${queryFilter} `,
      { type: QueryTypes.SELECT },
    );
  }

  getUserModel(): ModelCtor<Model> {
    return this.userModel;
  }
}
