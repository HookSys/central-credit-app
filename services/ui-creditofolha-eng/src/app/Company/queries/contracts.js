import createQuery from 'helpers/createQuery'

export const dashboardContractQuery = createQuery([
  'id',
  'efetivado_em',
  'ultimo_vencimento',
])

export const pendingAverbationQuery = createQuery([
  'identificador',
  'averbacao',
  'averbacao_ate',
  'valor_comprometido',
  'valor_comprometido_pos_aprovacao',
  'valor_recebivel',
  'status',
  'cliente',
  'percentual_comprometido',
  'emprego',
  'num_parcelas',
])
