import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import BankAccount from 'models/BankAccount'
import Document from 'models/Document'
import Address from 'models/Address'
import Company from 'models/Company'
import NextCut from 'models/NextCut'

const defaultValues = {
  id: null,
  nome: null,
  sobrenome: null,
  cpf: null,
  nascimento: null,
  sexo: null,
  dependentes: null,
  email: null,
  telefone_celular: null,
  pagamento: new BankAccount(),
  endereco: new Address(),
  documento: new Document(),
  matricula: null,
  status: null,
  cargo: null,
  nome_mae: null,
  admitido_em: null,
  salario: null,
  estado_civil: null,
  empresa: new Company(),
  inss: null,
  irrf: null,
  descontos: null,
  saldo_devedor: null,
  valor_emprestado: null,
  margem_disponivel: null,
  valor_emprestado_outros_bancos: null,
  possui_acesso: null,
  referencia_telefone: null,
  referencia_nome: null,
  referencia_parentesco: null,
  proximo_corte: new NextCut(),
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      pagamento: get(values, 'pagamento') ? new BankAccount(values.pagamento) : defaultValues.pagamento,
      empresa: get(values, 'empresa') ? new Company(values.empresa) : defaultValues.empresa,
      documento: get(values, 'documento') ? new Document(values.documento) : defaultValues.documento,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : defaultValues.endereco,
      proximo_corte: get(values, 'proximo_corte') ? new NextCut(values.proximo_corte) : defaultValues.proximo_corte,
    })
  }

  getDiscountsInssIrrf() {
    const inss = this.get('inss')
    const irrf = this.get('irrf')
    return Number(inss + irrf)
  }

  getCompromisedPercent() {
    const amountCep = this.get('valor_emprestado')
    const amountOthers = this.get('valor_emprestado_outros_bancos')
    const salary = this.get('salario')
    if ((amountCep + amountOthers) >= salary) {
      return '0, 00%'
    }

    const amountCompromised = ((amountCep + amountOthers) * 100) / salary
    return this.getFormatedPercent(amountCompromised, false)
  }

  getCompromised() {
    const amountCep = this.get('valor_emprestado')
    const amountOthers = this.get('valor_emprestado_outros_bancos')

    return amountCep + amountOthers
  }

  hasContracts() {
    return this.get('valor_emprestado') > 0
  }
}
