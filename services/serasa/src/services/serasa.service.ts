import { getService } from '@loopback/service-proxy'
import { inject, Provider } from '@loopback/core'
import { SerasaDataSource } from '../datasources'

export interface Serasa {
  getReport(param: string): Promise<string>
}

export class SerasaProvider implements Provider<Serasa> {
  constructor(
    @inject('datasources.Serasa')
    protected dataSource: SerasaDataSource = new SerasaDataSource()
  ) {}

  value(): Promise<Serasa> {
    return getService(this.dataSource)
  }
}
