import { Client, expect } from '@loopback/testlab'
import { CentralCreditAppApplication } from '../..'
import { setupApplication } from './test-helper'

describe('RecordsController', () => {
  let app: CentralCreditAppApplication
  let client: Client

  before('setupApplication', async () => {
    ;({ app, client } = await setupApplication())
  })

  after(async () => {
    await app.stop()
  })

  it('invokes GET /records', async () => {
    const res = await client.get('/records').expect(200)
    expect(res.body).be.not.null()
  })
})
