import { OnApplicationBootstrap } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize';
import { BaseRepository } from './base.repository';

export abstract class AssociateRepository
  extends BaseRepository
  implements OnApplicationBootstrap {
  private associateModels: Map<string, ModelCtor<Model>>;

  /**
   * TODO
   * Need associateModels provide factory method for better usage
   */
  protected abstract setupAssociation(): void;

  protected getAssociateModels(): Map<string, ModelCtor<Model>> {
    return this.associateModels;
  }

  protected getAssociateModel(key: string): ModelCtor<Model> {
    return this.associateModels.get(key);
  }

  protected abstract initAssociateModels(): Map<string, ModelCtor<Model>>;

  onModuleInit() {
    this.associateModels = this.initAssociateModels();
  }

  onApplicationBootstrap() {
    this.setupAssociation();
  }
}
