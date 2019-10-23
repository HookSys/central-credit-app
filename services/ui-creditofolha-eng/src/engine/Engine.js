/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import methods from 'engine/methods'
import properties from 'engine/creditofolha'

class Engine {
  constructor() {
    this.isEnvProduction = process.env.NODE_ENV === 'production'
    this.methods()
  }

  methods() {
    Object.keys(methods).forEach((method) => {
      this[method] = methods[method].bind(this)
    })
  }

  start = async () => {
    const props = properties()
    const propNames = Object.keys(props)
    const propValues = await Promise.all(Object.values(props))
    for (const [i, prop] of propNames.entries()) {
      this[prop] = await this.loadProperty(propValues[i])
    }

    return true
  }
}

export default new Engine()
