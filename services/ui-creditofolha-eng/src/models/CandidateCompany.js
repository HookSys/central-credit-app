import moment from 'moment'
import { List } from 'immutable'
import { get } from 'lodash'
import Actions from 'models/Actions'
import Address from 'models/Address'
import Contact from 'models/Contact'
import Billing from 'models/Billing'
import Patrimonial from 'models/Patrimonial'
import ConsignedHistory from 'models/ConsignedHistory'
import BaseRecord from './utils/BaseRecord'
import { toEntityList } from './utils/BaseList'

const defaultValues = {
  cnpj: '',
  razao_social: '',
  nome_fantasia: '',
  valor_da_folha: 0,
  capital_social: 0,
  endereco: new Address(),
  contatos: toEntityList([], Contact),
  historico_consignado: new ConsignedHistory(),
  acoes: new Actions(),
  patrimonial: new Patrimonial(),
  fundada_em: moment(),
  ramo_atividade: '',
  segmento: '',
  inscricao_estadual: '',
  natureza_juridica: '',
  nire: '',
  total_funcionarios: '',
  prinad: '',
  pmr: '',
  pmp: '',
  numero_filiais: '',
  concorrentes: '',
  serasa: '',
  faturamento: toEntityList([], Billing),
  endividamento: toEntityList([], Billing),
  valor_faturamento_bruto_ano: '',
  dia_corte: '',
  dia_pagamento: '',
  dia_pagamento_util: false,
  months: new List(),
}

export default class CandidateCompany extends BaseRecord(defaultValues, CandidateCompany) {
  constructor(values) {
    super({
      ...values,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : defaultValues.endereco,
      contatos: get(values, 'contatos')
        ? toEntityList(get(values, 'contatos'), Contact) : defaultValues.contatos,
      historico_consignado: get(values, 'historico_consignado')
        ? new ConsignedHistory(values.historico_consignado) : defaultValues.historico_consignado,
      acoes: get(values, 'acoes') ? new Actions(values.acoes) : defaultValues.acoes,
      patrimonial: get(values, 'patrimonial') ? new Patrimonial(values.patrimonial) : defaultValues.patrimonial,
      faturamento: get(values, 'faturamento') ? toEntityList(values.faturamento, Billing) : defaultValues.faturamento,
      endividamento: get(values, 'endividamento') ? toEntityList(values.endividamento, Billing) : defaultValues.endividamento,
    })
  }
}
