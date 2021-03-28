import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { UserRepository } from 'src/foo/repositories/user.repository';
import { AssociateRepository } from 'src/rds/core/associate.repository';
import { RDSService } from 'src/rds/rds.service';

@Injectable()
export class AdminRepository extends AssociateRepository {
  private adminModel: ModelCtor<Model>;

  constructor(
    private rdsService: RDSService,
    private userRepository: UserRepository,
  ) {
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

  protected initAssociateModels(): ModelCtor<Model>[] {
    console.log('initiate of association models is here');
    return null;
  }

  protected setupAssociation() {
    console.log(
      'the other model from other repo is available to do association here, your model is :',
      this.userRepository.getUserModel(),
    );
  }

  // getUserModel(): ModelCtor<Model> {
  //   return this.adminModel;
  // }
}
