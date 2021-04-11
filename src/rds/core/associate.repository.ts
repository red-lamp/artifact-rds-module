import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'sequelize';
import { BaseRepository } from './base.repository';

export abstract class AssociateRepository
  extends BaseRepository
  implements OnApplicationBootstrap {
  private associateFetch: Map<string, any>;

  /**
   * TODO
   * Need associateModels provide factory method for better usage
   */
  protected abstract setupAssociation(associateFetch: Map<string, any>): void;

  findAllAssociation(key: string, attributes?: any): Promise<Model[]> {
    attributes.include = this.associateFetch.get(key);
    return super.findAll(attributes);
  }

  onModuleInit() {
    super.onModuleInit();
    this.associateFetch = new Map<string, any>();
  }

  onApplicationBootstrap() {
    this.setupAssociation(this.associateFetch);
  }
}
