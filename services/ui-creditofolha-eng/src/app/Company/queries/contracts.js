import createQuery from 'helpers/createQuery'

export const dashboardContractQuery = createQuery([
  'id',
  'efetivado_em',
  'ultimo_vencimento',
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
