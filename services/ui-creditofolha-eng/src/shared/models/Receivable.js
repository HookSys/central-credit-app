import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import ReceivablePayment from 'models/ReceivablePayment'

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
  pagamentos: toEntityList([], ReceivablePayment),
  valor_presente: null,
}

export default class Receivable extends BaseRecord(defaultValues, Receivable) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
