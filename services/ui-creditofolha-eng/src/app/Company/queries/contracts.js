import createQuery from 'helpers/createQuery'

export const dashboardContractQuery = createQuery([
  'id',
  'efetivado_em',
  'ultimo_vencimento',
])

export const viewApprovedQuery = createQuery([
  'id',

  'funcionario__nome',
  'funcionario__sobrenome',

  'primeiro_vencimento',
  'ultimo_vencimento',
  'num_parcelas',
  'valor_recebivel',
  'status_averbacao',
  'valor_financiado',
  'valor_seguro',
  'data_solicitacao',
  'valor_iof',
  'valor_seguro',
  'status',
  'taxa_iof_complementar',
  'taxa_cet_mes',
  'valor_tarifas',
  'taxa_multa',
  'valor_total_devido',
  'valor_liberado',
  'origem',
])

export const approvedAverbationQuery = createQuery([
  'id',

  'funcionario__nome',
  'funcionario__sobrenome',

  'num_parcelas',
  'valor_recebivel',
  'status_averbacao',
  'valor_financiado',
  'status',
  'origem',
])

export const deniedAverbationQuery = createQuery([
  'id',

  'funcionario__nome',
  'funcionario__sobrenome',
  'funcionario__cpf',
  'funcionario__valor_emprestado',
  'funcionario__valor_emprestado_outros_bancos',
  'funcionario__salario',
  'funcionario__matricula',
  'funcionario__margem_disponivel',
  'funcionario__salario_margem',
  'funcionario__descontos',

  'num_parcelas',
  'valor_recebivel',
  'status_averbacao',
  'valor_financiado',
  'origem',
])


export const pendingAverbationQuery = createQuery([
  'id',
  'funcionario__nome',
  'funcionario__sobrenome',
  'funcionario__cpf',
  'funcionario__valor_emprestado',
  'funcionario__valor_emprestado_outros_bancos',
  'funcionario__salario',
  'funcionario__inss',
  'funcionario__irrf',
  'funcionario__matricula',
  'funcionario__margem_disponivel',
  'funcionario__salario_margem',
  'funcionario__descontos',

  'cliente_info_no_contrato__salario_liquido',

  'num_parcelas',
  'valor_recebivel',
  'data_solicitacao',
  'status_averbacao',
  'valor_financiado',
  'origem',
])
