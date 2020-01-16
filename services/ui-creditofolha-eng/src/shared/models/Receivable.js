import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import ReceivablePayment from 'models/ReceivablePayment'
import moment from 'moment'

const defaultValues = {
  id: null,
  contrato: null,
  vencimento_em: null,
  valor_parcela: null,
  principal: null,
  juros: null,
  seguro: null,
  dias_cobranca_multa: null,
  cancelado: null,
  desconto_aplicavel: null,
  mes_referencia: null,
  gerado_por: null,
  estornado_em: null,
  pagamentos: toEntityList([], ReceivablePayment),
  valor_presente: null,
}

export default class Receivable extends BaseRecord(defaultValues, Receivable) {
  constructor(values) {
    super({
      ...values,
      pagamentos: values.pagamentos ? toEntityList(values.pagamentos, ReceivablePayment)
        : defaultValues.pagamentos,
    })
  }

  isPaid() {
    const payments = this.get('pagamentos')
    return payments.size > 0 && payments.get(0).get('estornado_em') === null
  }

  isPending() {
    const expireDate = this.getAsMoment('vencimento_em')
    return !this.isPaid() && expireDate.isBefore(moment())
  }

  isFuture() {
    const expireDate = this.getAsMoment('vencimento_em')
    return !this.isPaid() && expireDate.isAfter(moment())
  }

  getStatusLabelAndColor() {
    if (this.isPending()) {
      return {
        label: 'PENDENTE',
        className: 'text-warning',
      }
    }
    if (this.isPaid()) {
      return {
        label: 'PAGO',
        className: 'text-success',
      }
    }

    return {
      label: '',
      className: '',
    }
  }
}
