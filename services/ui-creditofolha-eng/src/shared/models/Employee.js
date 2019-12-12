import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Payment from 'models/Payment'
import Client from 'models/Client'
import Address from 'models/Address'
import Person from 'models/Person'
import Company from 'models/Company'

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
  pagamento: new Payment(),
  endereco: new Address(),
  matricula: null,
  status: null,
  cargo: null,
  admitido_em: null,
  salario: null,
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
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      pagamento: get(values, 'pagamento') ? new Payment(values.pagamento) : defaultValues.pagamento,
      empresa: get(values, 'empresa') ? new Company(values.empresa) : defaultValues.empresa,
      cliente: get(values, 'cliente') ? new Client(values.cliente) : defaultValues.cliente,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : defaultValues.endereco,
      pessoa: get(values, 'pessoa') ? new Person(values.pessoa) : defaultValues.pessoa,
    })
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
}
