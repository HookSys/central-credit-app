import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Financial from 'employee/models/Financial'
import Client from 'employee/models/Client'
import Receivable from 'employee/models/Receivable'

const defaultValues = {
  identificador: null,
  num_parcelas: null,
  valor_recebivel: null,
  taxa_contrato: null,
  taxa_irr: null,
  valor_total_devido: null,
  taxa_cet_mes: null,
  taxa_cet_ano: null,
  taxa_iof: null,
  taxa_iof_complementar: null,
  valor_liberado: null,
  valor_iof: null,
  valor_tarifas: null,
  valor_juros: null,
  valor_seguro: null,
  primeiro_vencimento: null,
  ultimo_vencimento_em: null,
  data_solicitacao: null,
  valor_financiado: null,
  efetivado: null,
  status: null,
  cliente: new Client(),
  saldo_devedor: null,
  recebiveis: toEntityList([], Receivable),
  financeira: new Financial(),
  efetivado_em: null,
  data_pagamento: null,
  comissao: null,
  proposta: null,
}

export default class Contract extends BaseRecord(defaultValues, Contract) {
  constructor(values) {
    super({
      ...values,
      cliente: get(values, 'cliente') ? new Client(values.cliente) : defaultValues.cliente,
      financeira: get(values, 'financeira') ? new Financial(values.financeira) : defaultValues.financeira,
      recebiveis: get(values, 'recebiveis') ? toEntityList(get(values, 'recebiveis'), Receivable) : defaultValues.recebiveis,
    })
  }
}
