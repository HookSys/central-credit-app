import { DefaultCrudRepository } from '@loopback/repository';
import { Company, CompanyRelations } from '../models';
import { MongoDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Company, dataSource);
  }
}
