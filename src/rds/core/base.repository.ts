import { Logger, OnModuleInit } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize';

export abstract class BaseRepository implements OnModuleInit {
  private model: ModelCtor<Model>;

  /**
   * TODO
   * Need more factory pattern to be wrap sequelize functions
   */
  protected abstract init(): ModelCtor<Model>;

  findAll(attributes?: any): Promise<Model[]> {
    return this.model.findAll(attributes);
  }

  findOne(where: any): Promise<Model> {
    return this.model.findOne(where);
  }

  findAllWithCallback(attributes: any, callback: (users: Model[]) => any) {
    // return this.model.findAll(attributes);
    return this.model
      .findAll(attributes)
      .then((data: Model[]) => {
        callback(data);
      })
      .catch((err) => {
        Logger.error(err, err.stack, BaseRepository.name);
      });
  }

  insert(data: any, fields?: any): Promise<Model> {
    return this.model.create(data, fields);
  }

  update(data: any, where: any): Promise<[number, Model[]]> {
    return this.model.update(data, where);
  }

  upsert(data: any, where: any): Promise<[Model, boolean]> {
    return this.model.upsert(data, where);
  }

  delete(where: any): Promise<number> {
    return this.model.destroy(where);
  }

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
    this.model = this.init();
  }
}
