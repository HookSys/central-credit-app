import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise
} from '@loopback/core'
import { juggler } from '@loopback/repository'
import debugFactory from 'debug'
import config from './serasa.datasource.config.json'
import { NAMESPACES } from '../debug-config.js'

const debug = debugFactory(NAMESPACES.SERASA)

@lifeCycleObserver('datasource')
export class SerasaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Serasa'

  constructor(
    @inject('datasources.config.Serasa', { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig)
  }

  start(): ValueOrPromise<void> {
    debug('Starting DataSource')
    if (this.connector && typeof this.connector.observe === 'function') {
      this.connector.observe('before execute', function(
        ctx: object,
        next: Function
      ) {
        debug(ctx)
        next()
      })
    }
  }

  stop(): ValueOrPromise<void> {
    debug('Stopping DataSource')
    return super.disconnect()
  }
}
