import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  id: '',
  tipo: '',
  data: '',
  titulo: '',
  mensagem: '',
  relacionado_a_id: '',
  relacionado_a_tipo: '',
  lido: '',
  leitura_em: '',
}

export default class Alert extends BaseRecord(defaultValues, Alert) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
