import { DefaultCrudRepository } from '@loopback/repository'
import { Domain, DomainRelations } from '../models'
import { MongoDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class DomainRepository extends DefaultCrudRepository<
  Domain,
  typeof Domain.prototype.id,
  DomainRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Domain, dataSource)
  }
}
