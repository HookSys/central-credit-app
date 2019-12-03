import moment from 'moment'
import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'

import Company from 'company/models/Company'

const defaultValues = {
  id: '',
  nome: '',
  sobrenome: '',
  cpf: null,
  matricula: '',
  status: '',
  cargo: '',
  admitido_em: moment(),
  salario: null,
  saldo_devedor: null,
  valor_emprestado: null,
  margem_disponivel: '',
  possui_acesso: '',
  empresa: new Company(),
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      empresa: get(values, 'empresa') ? new Company(values.empresa) : defaultValues.empresa,
      admitido_em: get(values, 'admitido_em') ? moment(values.admitido_em) : defaultValues.admitido_em,
    })
  }
}
