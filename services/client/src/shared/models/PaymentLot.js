import { get } from 'lodash'
import moment from 'moment'
import { List, Map } from 'immutable'
import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Discount from 'models/Discount'
import Payment from 'models/Payment'
import PAYMENT_LOT_STATUS from 'constants/paymentLot'

const defaultValues = {
  id: '',
  mes_referencia: '',
  valor_previsto: 0,
  valor_descontado: 0,
  status: new List(),
  descontos_por_funcionario: toEntityList([], Discount),
  pagamento: toEntityList([], Payment),
  corte_em: '',
  processado_em: '',
  vencimento_em: '',
  enviado_em: '',
  conciliado_em: '',
}

export default class PaymentLot extends BaseRecord(defaultValues, PaymentLot) {
  constructor(values) {
    super({
      ...values,
      status: get(values, 'status') ? new List(values.status) : defaultValues.status,
      pagamento: get(values, 'pagamento') ? toEntityList(values.pagamento, Payment) : defaultValues.pagamento,
      descontos_por_funcionario: get(values, 'descontos_por_funcionario')
        ? toEntityList(values.descontos_por_funcionario, Discount)
        : defaultValues.descontos_por_funcionario,
    })
  }

  getDifferenceValue() {
    const expectedValue = this.get('valor_previsto')
    const discountedValue = this.get('valor_descontado')
    return expectedValue - discountedValue
  }

  getReferenceMonth() {
    const referenceMonth = this.get('mes_referencia')
    if (referenceMonth) {
      const year = referenceMonth.substr(0, 4)
      const month = referenceMonth.substr(4, 2)
      return moment(`01/${ month }/${ year }`, 'DD/MM/YYYY')
    }

    return moment()
  }

  getFormatedReferenceMonth(format = 'MM/YYYY') {
    const referenceMonth = this.getReferenceMonth()
    if (referenceMonth) {
      return referenceMonth.format(format)
    }

    return ''
  }

  isConciliated() {
    return [
      PAYMENT_LOT_STATUS.CONCILIATED,
      PAYMENT_LOT_STATUS.AUTO_CONCILIATED,
    ].includes(this.get('status'))
  }

  getRequest(values) {
    if (values && List.isList(values)) {
      return new Map({
        descontos_por_funcionario: values.map((discount) => {
          return new Map({
            valor_descontado: discount.get('valor_descontado'),
            divergencia: discount.get('divergencia'),
            cpf: discount.getIn(['funcionario', 'cpf']),
          })
        }),
      })
    }

    return new Map()
  }
}
