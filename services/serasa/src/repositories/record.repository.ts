import { DefaultCrudRepository } from '@loopback/repository'
import { Record, RecordRelations } from '../models'
import { MongoDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class RecordRepository extends DefaultCrudRepository<
  Record,
  typeof Record.prototype.id,
  RecordRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Record, dataSource)
  }
}
