import createQuery from 'helpers/createQuery'

export const dashboardPaymentLotQuery = createQuery([
  'vencimento_em',
])

export const repassDiscountLotQuery = createQuery([
  'vencimento_em',
  'valor_descontado',
  'valor_previsto',
  'pagamento',
  'status',
  'descontos_por_funcionario',
])
