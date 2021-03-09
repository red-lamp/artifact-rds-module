import { OnModuleInit } from '@nestjs/common';
import { Model } from 'sequelize';

export abstract class BaseRepository implements OnModuleInit {
  /**
   * TODO
   * Need more factory pattern to be wrap sequelize functions
   */
  protected abstract init();

  protected abstract findAll(attributes: any): Promise<Model[]>;

  protected abstract findOne(where: any): Promise<Model>;

  protected abstract insert(data: any, fields: any): Promise<Model>;

  protected abstract update(data: any, where: any): Promise<[number, Model[]]>;

  protected abstract upsert(data: any, where: any): Promise<[Model, boolean]>;

  protected abstract delete(where: any): Promise<number>;

  protected insertAndUpdate(
    insertData: any,
    fields: any,
    updateData: any,
    where: any,
  ) {
    this.insert(insertData, fields);
    this.update(updateData, where);
  }

  protected findAllAndUpdate(attributes: any, updateData: any, where: any) {
    this.findAll(attributes);
    this.update(updateData, where);
  }

  onModuleInit() {
    this.init();
  }
}
