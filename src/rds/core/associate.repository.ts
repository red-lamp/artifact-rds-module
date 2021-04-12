import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'sequelize';
import { BaseRepository } from './base.repository';

export abstract class AssociateRepository
  extends BaseRepository
  implements OnApplicationBootstrap {
  private associateFetch: Map<string, any>;
  private includeAttrs: any;

  /**
   * TODO
   * Need associateModels provide factory method for better usage
   */
  protected abstract setupAssociation(associateFetch: Map<string, any>): void;

  include(key: string): AssociateRepository {
    this.includeAttrs = this.associateFetch.get(key);
    return this;
  }

  findAll(attributes?: any): Promise<Model[]> {
    if (attributes && this.includeAttrs) {
      attributes.include = this.includeAttrs;
    }
    const promise = super.findAll(attributes);

    this.includeAttrs = null;

    return promise;
  }

  findOne(where: any): Promise<Model> {
    if (where && this.includeAttrs) {
      where.include = this.includeAttrs;
    }
    const promise = super.findOne(where);

    this.includeAttrs = null;

    return promise;
  }

  onModuleInit() {
    super.onModuleInit();
    this.associateFetch = new Map<string, any>();
  }

  onApplicationBootstrap() {
    this.setupAssociation(this.associateFetch);
  }
}
