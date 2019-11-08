import { get } from 'lodash'
import BaseRecord from 'models/utils/BaseRecord'
import Company from 'models/Company'
import Financial from 'models/Financial'
import Employee from 'models/Employee'
import ContractClientInfo from 'models/ContractClientInfo'

const defaultValues = {
  id: '',
  financeira: new Financial(),
  cliente: '',
  cliente_info_no_contrato: new ContractClientInfo(),
  status: '',
  primeiro_vencimento: '',
  ultimo_vencimento: '',
  gerado_em: '',
  efetivado_em: '',
  data_pagamento: '',
  proposta: '',
  taxa_contrato: '',
  taxa_irr: '',
  taxa_cet_mes: '',
  taxa_iof: '',
  taxa_iof_complementar: '',
  taxa_multa: '',
  dias_cobranca_multa: '',
  valor_liberado: 0,
  valor_iof: 0,
  valor_tarifas: 0,
  valor_juros: 0,
  valor_recebivel: 0,
  valor_seguro: 0,
  valor_total_devido: 0,
  valor_financiado: 0,
  num_parcelas: 0,
  data_solicitacao: '',
  modalidade: '',
  promotora: '',
  funcionario: new Employee(),
  status_averbacao: '',
  empresa: new Company(),
}

export default class Contract extends BaseRecord(defaultValues, Contract) {
  constructor(values) {
    super({
      ...values,
      funcionario: get(values, 'funcionario', false) ? new Employee(values.funcionario) : defaultValues.funcionario,
      empresa: get(values, 'empresa', false) ? new Company(values.empresa) : defaultValues.empresa,
      financeira: get(values, 'financeira', false) ? new Financial(values.financeira) : defaultValues.financeira,
      cliente_info_no_contrato: get(values, 'cliente_info_no_contrato', false)
        ? new ContractClientInfo(values.cliente_info_no_contrato)
        : defaultValues.cliente_info_no_contrato,
    })
  }

  isDenied() {
    return this.get('status') === 'cancelado'
  }

  isActive() {
    return this.get('status') === 'ativo'
  }

  isApproved() {
    return this.get('status') === 'aprovado'
  }

  getYearlyContractFee() {
    const monthlyFee = this.get('taxa_contrato')
    return this.getFormatedPercent((monthlyFee * 12), false, true)
  }
}
