import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository
} from '@loopback/repository'
import { Field, FieldRelations, Domain } from '../models'
import { MongoDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { DomainRepository } from './domain.repository'

export class FieldRepository extends DefaultCrudRepository<
  Field,
  typeof Field.prototype.id,
  FieldRelations
> {
  public readonly domain: BelongsToAccessor<Domain, typeof Domain.prototype.id>

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('DomainRepository')
    domainRepository: Getter<DomainRepository>
  ) {
    super(Field, dataSource)
    this.domain = this.createBelongsToAccessorFor('domain', domainRepository)
  }
}
