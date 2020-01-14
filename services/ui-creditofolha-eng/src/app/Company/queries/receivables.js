import createQuery from 'helpers/createQuery'

export const approvedContractReceivableQuery = createQuery([
  'id',
  'vencimento_em',
  'valor_parcela',
  'mes_referencia',
  'gerado_por',

  'pagamentos__id',
  'pagamentos__pago_em',
  'pagamentos__total_pago',
  'pagamentos__diferenca',

  'valor_presente',
])
