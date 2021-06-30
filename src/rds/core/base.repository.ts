import { Logger, OnModuleInit } from '@nestjs/common';
import { Sequelize, Model, ModelCtor, Op } from 'sequelize';

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

  findOne(where?: any): Promise<Model> {
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

  insert(data: any, fields?: any): Promise<void | Model> {
    fields = this.constructAttrOptions(fields);

    const promise = this.model.create(data, fields);

    this.clearIncludeOptions();

    return promise;
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

  where(dto: any, identifier?: string): BaseRepository {
    if (!dto) {
      return this;
    }
    this.includeOptions['where'] = {};
    if (identifier) {
      this.includeOptions['where'][identifier] = dto[identifier];
    } else {
      for (const identifier of Object.keys(dto)) {
        this.includeOptions['where'][identifier] = dto[identifier];
      }
    }
    return this;
  }

  or(dto: Array<any>): BaseRepository {
    if (!dto) {
      return this;
    }
    if (!this.includeOptions['where']) {
      this.includeOptions['where'] = {};
    }

    this.includeOptions['where'][Op.or] = dto;

    return this;
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

  page(page: number, limit = 20): BaseRepository {
    limit = this.includeOptions['limit'];
    this.includeOptions['offset'] = (page - 1) * limit;

    return this;
  }

  clause(
    clause: string,
    field: string,
    display: string,
    option = {},
  ): BaseRepository {
    if (!this.includeOptions['attributes']) {
      this.includeOptions['attributes'] = [];
    }
    const attributes = this.includeOptions['attributes'];

    if (option['cast']) {
      attributes.push([
        Sequelize.cast(
          Sequelize.fn(clause, Sequelize.col(field)),
          option['cast'],
        ),
        display,
      ]);
    } else {
      attributes.push([Sequelize.fn(clause, Sequelize.col(field)), display]);
    }

    this.includeOptions['attributes'] = attributes;

    return this;
  }

  field(field: string, display?: string): any {
    if (!this.includeOptions['attributes']) {
      this.includeOptions['attributes'] = [];
    }
    const attributes = this.includeOptions['attributes'];
    if (display) {
      attributes.push([field, display]);
    } else {
      attributes.push([field, field]);
    }

    this.includeOptions['attributes'] = attributes;

    return this;
  }

  jsonField(field: string, display: string): any {
    if (!this.includeOptions['attributes']) {
      this.includeOptions['attributes'] = [];
    }
    const attributes = this.includeOptions['attributes'];
    attributes.push([Sequelize.json(field), display]);

    this.includeOptions['attributes'] = attributes;

    return this;
  }

  group(field: string, isJson?: true): any {
    if (!this.includeOptions['group']) {
      this.includeOptions['group'] = [];
    }

    const groups = this.includeOptions['group'];

    if (isJson) {
      groups.push(Sequelize.json(field));
    } else {
      groups.push(field);
    }

    this.includeOptions['group'] = groups;

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
