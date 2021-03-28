import { OnApplicationBootstrap } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize';
import { BaseRepository } from './base.repository';

export abstract class AssociateRepository
  extends BaseRepository
  implements OnApplicationBootstrap {
  private associateModels: ModelCtor<Model>[];

  /**
   * TODO
   * Need associateModels provide factory method for better usage
   */
  protected abstract setupAssociation(): void;

  protected getAssociateModels(): ModelCtor<Model>[] {
    return this.associateModels;
  }
  protected abstract initAssociateModels(): ModelCtor<Model>[];

  onModuleInit() {
    this.associateModels = this.initAssociateModels();
  }

  onApplicationBootstrap() {
    this.setupAssociation();
  }
}
