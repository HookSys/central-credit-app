import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import BankAccount from 'models/BankAccount'
import Contract from 'models/Contract'
import Employee from 'models/Employee'

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
  comissao: null,
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
  valor_solicitado: null,
  efetivado: null,
  status: null,
  saldo_devedor: null,
  pagamento: new BankAccount(),
  financeira: null,
  efetivado_em: null,
  data_pagamento: null,
  proposta: null,
  contrato: new Contract(),
  emprego: new Employee(),
  valor_comprometido: null,
  valor_comprometido_pos_aprovacao: null,
  debito_mensal_em_folha: null,
}

export default class Proposal extends BaseRecord(defaultValues, Proposal) {
  constructor(values) {
    super({
      ...values,
      contrato: get(values, 'contrato') ? new Contract(values.contrato) : defaultValues.contrato,
      emprego: get(values, 'emprego') ? new Employee(values.emprego) : defaultValues.emprego,
      pagamento: get(values, 'pagamento') ? new BankAccount(values.pagamento) : defaultValues.pagamento,
    })
  }

  getNextDue() {
    const receivables = this.getIn(['contrato', 'recebiveis'])
    if (receivables) {
      return receivables.reduce((nextDue, receivable) => {
        if (receivable.get('pagamentos').length === 0 && nextDue === null) {
          return receivable.getFormatedDate('vencimento_em', 'DD/MM/YYYY')
        }
        return nextDue
      }, null)
    }
    return null
  }
}
