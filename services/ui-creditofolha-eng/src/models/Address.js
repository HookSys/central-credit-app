import moment from 'moment'
import { get } from 'lodash'
import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  uf: '',
  cidade: '',
  pais: '',
  residencia_tipo: '',
  residencia_tempo: moment(),
}

export default class Address extends BaseRecord(defaultValues, Address) {
  constructor(values) {
    super({
      ...values,
      residencia_tempo: get(values, 'residencia_tempo') ? moment(values.residencia_tempo) : moment(),
    })
  }
}
