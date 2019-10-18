import helpers from './helpers'
import configs from './configs'
import service from './service'
import spy from './spy'
import store from './store'
import middleware from './middleware'
import themes from './themes'
import structures from './structures'
import sentry from './sentry'

class AppEngine {
  constructor() {
    this.isEnvProduction = process.env.NODE_ENV === 'production'
    this.createInstances()
  }

  createInstances() {
    this.structures = structures(this)
    this.themes = themes(this)
    this.configs = configs(this)
    this.spy = spy(this)
    this.service = service(this)
    this.helpers = helpers(this)
    this.middleware = middleware(this)
    this.store = store(this)
    this.sentry = sentry(this)
  }

  start() {
  }
}

export default new AppEngine()
