import BaseRecord from 'models/utils/BaseRecord'
import moment from 'moment'

const defaultValues = {
  nome: '',
  sobrenome: '',
  cpf: 0,
  matricula: '',
  status: '',
  cargo: '',
  admitido_em: moment(),
  fullName: '',
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      fullName: values && `${ values.nome || '' } ${ values.sobrenome || '' }`,
      admitido_em: values && values.admitido_em
        ? moment(values.admitido_em)
        : defaultValues.admitido_em,
    })
  }

  getWorkTime() {
    const dateStarted = this.get('admitido_em')
    if (moment.isMoment(dateStarted)) {
      return moment(Date.now()).diff(dateStarted, 'years')
    }
    return 0
  }

  getFullName() {
    return this.get('fullName')
  }
}
