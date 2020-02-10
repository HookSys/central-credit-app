import { CentralCreditAppApplication } from './application'
import { ApplicationConfig } from '@loopback/core'

export { CentralCreditAppApplication }

export async function main(options: ApplicationConfig = {}) {
  const app = new CentralCreditAppApplication(options)
  await app.boot()
  await app.start()

  const url = app.restServer.url
  console.log(`Serasa Service is running at ${url}`)

  return app
}
