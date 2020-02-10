import { OracleCreditApplication } from './application'
import { ApplicationConfig } from '@loopback/core'

export { OracleCreditApplication }

export async function main(options: ApplicationConfig = {}) {
  const app = new OracleCreditApplication(options)
  await app.boot()
  await app.start()

  const url = app.restServer.url
  console.log(`Server is running at ${url}`)

  return app
}
