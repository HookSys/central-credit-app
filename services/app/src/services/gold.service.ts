import { getService } from '@loopback/service-proxy'
import { inject, Provider } from '@loopback/core'
import { GoldDataSource } from '../datasources'

export interface Gold {
  generate(dataSource: string, onlyPayments: string): Promise<object>
}

export class GoldProvider implements Provider<Gold> {
  constructor(
    @inject('datasources.Gold')
    protected dataSource: GoldDataSource = new GoldDataSource()
  ) {}

  value(): Promise<Gold> {
    return getService(this.dataSource)
  }
}
