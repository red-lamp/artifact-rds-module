import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { UserRepository } from 'src/foo/repositories/user.repository';
import { AssociateRepository } from 'src/rds/core/associate.repository';
import { RDSService } from 'src/rds/rds.service';

@Injectable()
export class ProjectRepository extends AssociateRepository {
  private projectModel: ModelCtor<Model>;

  constructor(
    private rdsService: RDSService,
    @Inject(forwardRef(() => UserRepository))
    private userRepository: UserRepository,
  ) {
    super();
  }

  protected init() {
    this.projectModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'Project',
        {
          // Model attributes are defined here
          name: {
            type: DataTypes.STRING,
          },
          location: {
            type: DataTypes.STRING,
          },
          area_size: {
            type: DataTypes.STRING,
          },
          product: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.STRING,
          },
          user_id: {
            type: DataTypes.INTEGER,
          },
          image_url: {
            type: DataTypes.ARRAY(DataTypes.STRING),
          },
          type: {
            type: DataTypes.STRING,
          },
          status: {
            type: DataTypes.STRING,
          },
        },
        'project',
      );
    return this.projectModel;
  }

  protected setupAssociation(associateFetch: Map<string, any>) {
    console.log(
      'the other model from other repo is available to do association here, your model from repository is :',
      this.projectModel,
      this.userRepository.getModel(),
    );

    this.projectModel.belongsTo(this.userRepository.getModel(), {
      foreignKey: 'user_id',
    });

    associateFetch.set('user', this.userRepository.getModel());
    // associateFetch.set('user-others', [
    //   {
    //     model: this.userRepository.getUserModel(),
    //     include: [
    //       {
    //         model: otherModel,
    //       },
    //     ],
    //   },
    // ]);
  }
}
