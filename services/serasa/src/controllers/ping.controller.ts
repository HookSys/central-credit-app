import { get } from '@loopback/rest'
import { inject } from '@loopback/core'
import { Serasa } from '../services'
import { repository } from '@loopback/repository'
import Layout, {
  LayoutParams,
  LayoutRecord,
  LayoutParamsoP,
  LayoutParamsType,
  LayoutParamsPType
} from '../layouts/base.layout'
import {
  // Layout as LayoutType,
  RecordField,
  RecordParameter,
  RecordParameterType
} from '../models'
import debugFactory from 'debug'
import { NAMESPACES } from '../debug-config'
import { RecordRepository } from '../repositories'
import { RecordBuilder } from '../builders/record.builder'
// import { LayoutRecordType } from '../layouts/relato.layout'

const debug = debugFactory(NAMESPACES.TEST)

export class PingController {
  constructor(
    @inject('services.Serasa') protected serasaService: Serasa,
    @repository(RecordRepository) public recordRepository: RecordRepository
  ) {}

  async create<P>(
    name: string,
    size: number,
    object: LayoutRecord[],
    paramsObj: object
  ): Promise<Object> {
    const result = await this.recordRepository.create({
      name,
      size,
      createdAt: new Date().toISOString(),
      fields: object.map<Partial<RecordField>>(field => ({
        seq: field.seq,
        size: field.size,
        type: field.type,
        description: field.description,
        value: field.value
      })),
      params: Object.values(paramsObj).map<Partial<RecordParameter>>(value => {
        return {
          id: value.slice(1),
          type: RecordParameterType.STRING
        }
      })
    })

    return result
  }

  @get('/create')
  async ping(): Promise<Object> {
    const header = await this.create<LayoutParamsType>(
      'Header',
      400,
      Layout.protocol,
      LayoutParams
    )
    const queryOptions = await this.create<LayoutParamsPType>(
      'QueryOptions',
      115,
      Layout.options,
      LayoutParamsoP
    )
    return { header, queryOptions }
  }

  @get('/run')
  async run(): Promise<Object> {
    const headerRecord = await this.recordRepository.findOne({
      where: {
        name: 'Header'
      }
    })
    const optionsRecord = await this.recordRepository.findOne({
      where: {
        name: 'QueryOptions'
      }
    })
    if (headerRecord && optionsRecord) {
      debug(headerRecord)
      const headerBuilder = new RecordBuilder(headerRecord)
      headerBuilder.addParameter(LayoutParams.NumDoc, '69720010568')
      headerBuilder.addParameter(LayoutParams.TipoPessoa, 'F')
      headerBuilder.addParameter(LayoutParams.BaseCons, 'C')
      headerBuilder.addParameter(LayoutParams.Modalidade, 'FI')
      headerBuilder.addParameter(LayoutParams.VlrConsul, '1000')
      headerBuilder.addParameter(LayoutParams.Codificado, 'N')
      headerBuilder.addParameter(LayoutParams.QtdReg, '99')
      headerBuilder.addParameter(LayoutParams.Conversa, 'S')
      headerBuilder.addParameter(LayoutParams.Funcao, 'INI')
      headerBuilder.addParameter(LayoutParams.TpConsulta, 'A')
      headerBuilder.addParameter(LayoutParams.Atualiza, 'N')
      headerBuilder.addParameter(LayoutParams.EndTel, 'N')
      headerBuilder.addParameter(LayoutParams.Alerta, 'S')
      const header = headerBuilder.build()

      const optionsBuilder = new RecordBuilder(optionsRecord)
      optionsBuilder.addParameter(LayoutParamsoP.TipoReg, 'P002')
      optionsBuilder.addParameter(LayoutParamsoP.Cod1, 'RE02')
      const options = optionsBuilder.build()

      const pass = '97024725Centra@2        '
      const rel = pass.concat(header.concat(options)).concat('T999')
      const report = await this.serasaService.getReport(rel)

      return { record: report }
    }
    return {}
  }
}
