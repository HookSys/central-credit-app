import {
  Request,
  RestBindings,
  get,
  ResponseObject,
  requestBody,
  post
} from '@loopback/rest'
import { inject } from '@loopback/context'
import { authenticate } from '@loopback/authentication'
import { Gold } from '../services/gold.service'
import { GenerateRequest } from '../interfaces/relato.interface'
import { RelatoGenerateRequestDto } from '../models/dtos/relato.dto'
import { Central } from '../services/central.service'
import { Consult } from '../services/consult.service'

export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.Gold') protected goldService: Gold,
    @inject('services.Central') protected centralService: Central,
    @inject('services.Consult') protected consultService: Consult
  ) {}

  // Map to `GET /ping`
  @post('/generate')
  async generate(
    @requestBody(RelatoGenerateRequestDto) request: GenerateRequest
  ): Promise<object> {
    const gold = await this.goldService.generate(
      request.database,
      request.onlyPayments
    )
    const central = await this.centralService.generate(
      request.database,
      request.onlyPayments
    )
    const consult = await this.consultService.generate(
      request.database,
      request.onlyPayments
    )
    return {
      gold,
      central,
      consult
    }
  }
}
