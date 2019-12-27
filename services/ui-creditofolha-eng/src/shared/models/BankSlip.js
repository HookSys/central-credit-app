import BaseRecord from 'base/BaseRecord'
import moment from 'moment'

const defaultValues = {
  id: '',
  status: '',
  codigo_barras: '',
  nosso_numero: '',
  valor: 0,
  vencimento_em: moment(),
  url_pdf: '',
  url_img: '',
  relacionado_a: [],
  descricao: '',
  carteira: '',
  pago_em: '',
  valor_pago: 0,
}

export default class BankSlip extends BaseRecord(defaultValues, BankSlip) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
