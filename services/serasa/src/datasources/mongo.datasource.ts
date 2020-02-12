// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject, lifeCycleObserver, ValueOrPromise } from '@loopback/core'
import { juggler, AnyObject } from '@loopback/repository'
import debugFactory from 'debug'
import config from './mongo.datasource.config.json'
import { NAMESPACES } from '../debug-config.js'

const debug = debugFactory(NAMESPACES.MONGO)

function updateConfig(dsConfig: AnyObject) {
  // if (process.env.MONGODB_SERVICE_HOST) {
  //   dsConfig.host = process.env.MONGODB_SERVICE_HOST
  //   dsConfig.port = +process.env.MONGODB_SERVICE_PORT!
  // }
  return dsConfig
}

@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo'

  constructor(
    @inject('datasources.config.mongo', { optional: true })
    dsConfig: AnyObject = config
  ) {
    super(updateConfig(dsConfig))
  }

  start(): ValueOrPromise<void> {
    debug('Starting DataSource')
  }

  stop(): ValueOrPromise<void> {
    debug('Stopping DataSource')
    return super.disconnect()
  }
}
