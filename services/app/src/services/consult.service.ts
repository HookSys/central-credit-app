import { getService } from '@loopback/service-proxy'
import { inject, Provider } from '@loopback/core'
import { ConsultDataSource } from '../datasources'

export interface Consult {
  generate(dataSource: string, onlyPayments: string): Promise<object>
}

export class ConsultProvider implements Provider<Consult> {
  constructor(
    @inject('datasources.Consult')
    protected dataSource: ConsultDataSource = new ConsultDataSource()
  ) {}

  value(): Promise<Consult> {
    return getService(this.dataSource)
  }
}
