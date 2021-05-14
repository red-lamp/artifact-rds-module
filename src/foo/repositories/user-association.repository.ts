import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor, QueryTypes } from 'sequelize';
import { ProjectRepository } from 'src/bar/repositories/project.repository';
import { AssociateRepository } from 'src/rds/core/associate.repository';
import { RDSService } from 'src/rds/rds.service';

@Injectable()
export class UserAssociationRepository extends AssociateRepository {
  private userModel: ModelCtor<Model>;

  constructor(
    private rdsService: RDSService,
    @Inject(forwardRef(() => ProjectRepository))
    private readonly projectRepository: ProjectRepository,
  ) {
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

  protected setupAssociation(associateFetch: Map<string, any>) {
    this.userModel.hasMany(this.projectRepository.getModel(), {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });

    associateFetch.set('project', this.projectRepository.getModel());
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
}
