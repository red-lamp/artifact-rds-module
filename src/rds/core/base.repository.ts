import { Logger, OnModuleInit } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize';

export abstract class BaseRepository implements OnModuleInit {
  protected model: ModelCtor<Model>;
  protected includeOptions = {};

  /**
   * TODO
   * Need more factory pattern to be wrap sequelize functions
   */
  protected abstract init(): ModelCtor<Model>;

  private constructAttrOptions(attrOptions?: any) {
    if (!attrOptions) {
      attrOptions = {};
    }
    if (this.includeOptions) {
      attrOptions = { ...attrOptions, ...this.includeOptions };
    }
    return attrOptions;
  }

  findAll(attributes?: any): Promise<Model[]> {
    attributes = this.constructAttrOptions(attributes);

    const promise = this.model.findAll(attributes);

    this.clearIncludeOptions();

    return promise;
  }

  findAndCountAll(
    attributes?: any,
  ): Promise<{ rows: Model<any, any>[]; count: number }> {
    attributes = this.constructAttrOptions(attributes);

    const promise = this.model.findAndCountAll(attributes);

    this.clearIncludeOptions();

    return promise;
  }

  findOne(where: any): Promise<Model> {
    where = this.constructAttrOptions(where);

    const promise = this.model.findOne(where);

    this.clearIncludeOptions();

    return promise;
  }

  async findAllWithCallback(
    attributes: any,
    callback: (models: Model[]) => any,
  ) {
    // return this.model.findAll(attributes);
    try {
      const data = await this.model.findAll(attributes);
      callback(data);
    } catch (err) {
      Logger.error(err, err.stack, BaseRepository.name);
    }
  }

  insert(data: any, fields?: any): Promise<Model> {
    fields = this.constructAttrOptions(fields);

    const promises = this.model.create(data, fields);

    this.clearIncludeOptions();

    return promises;
  }

  bulkInsert(data: any[], fields?: any): Promise<Array<Model>> {
    return this.model.bulkCreate(data, fields);
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

  getModel(): ModelCtor<Model> {
    return this.model;
  }

  buildQueryOption(dto: any, identifier: string): any {
    if (!dto[identifier]) {
      return null;
    }

    const options = { where: {} };
    options.where[identifier] = dto[identifier];

    return options;
  }

  order(field: string, type: string): BaseRepository {
    if (type == 'ASC') {
      this.includeOptions['order'] = [[field, 'ASC']];
    } else {
      this.includeOptions['order'] = [[field, 'DESC']];
    }

    return this;
  }

  limit(limit: number): BaseRepository {
    this.includeOptions['limit'] = limit;

    return this;
  }

  includePagination(page: number, limit: number): BaseRepository {
    this.includeOptions['limit'] = limit;
    this.includeOptions['offset'] = (page - 1) * limit;

    return this;
  }

  private clearIncludeOptions() {
    this.includeOptions = {};
  }

  onModuleInit() {
    this.model = this.init();
  }

  query(sql: any, queryOptions?: any): Promise<any> {
    const promise = this.model.sequelize.query(sql, queryOptions);
    return promise;
  }
}
