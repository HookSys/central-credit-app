import { getService } from '@loopback/service-proxy'
import { inject, Provider } from '@loopback/core'
import { CentralDataSource } from '../datasources'

export interface Central {
  generate(dataSource: string, onlyPayments: string): Promise<object>
}

export class CentralProvider implements Provider<Central> {
  constructor(
    @inject('datasources.Central')
    protected dataSource: CentralDataSource = new CentralDataSource()
  ) {}

  value(): Promise<Central> {
    return getService(this.dataSource)
  }
}
