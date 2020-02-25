import createQuery from 'helpers/createQuery'

export const dashboardPaymentLotQuery = createQuery([
  'vencimento_em',
])

export const pendingPaymentLotQuery = createQuery([
  'mes_referencia',
  'status',
  'vencimento_em',
])

export const repassDetailingLotQuery = createQuery([
  'mes_referencia',
  'valor_previsto',
  'valor_descontado',
  'status',
  'descontos_por_funcionario',
])

export const repassDiscountLotQuery = createQuery([
  'vencimento_em',
  'mes_referencia',
  'valor_descontado',
  'valor_previsto',
  'pagamento',
  'status',
  'descontos_por_funcionario',
])
