import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Payment from 'models/Payment'
import Company from 'models/Company'

const defaultValues = {
  id: null,
  pagamento: new Payment(),
  status: null,
  matricula: null,
  admitido_em: null,
  cargo: null,
  salario_bruto: null,
  cliente: null,
  nome: null,
  sobrenome: null,
  cpf: null,
  salario: null,
  saldo_devedor: null,
  valor_emprestado: null,
  margem_disponivel: null,
  possui_acesso: null,
  empresa: new Company(),
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      pagamento: get(values, 'pagamento') ? new Payment(values.pagamento) : defaultValues.pagamento,
      empresa: get(values, 'empresa') ? new Company(values.empresa) : defaultValues.empresa,
    })
  }
}
