import { DefaultCrudRepository } from '@loopback/repository'
import { Layout, LayoutRelations } from '../models'
import { MongoDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Layout, dataSource)
  }
}
