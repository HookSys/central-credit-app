export const ContractTypes = {
  RENEGOTIATION: 'renegociacao',
  PORTABILITY: 'portabilidade',
  NEW_CONTRACT: 'novo-contrato',
}

export const ContractTypeDescription = {
  [ContractTypes.RENEGOTIATION]: 'Renegociação',
  [ContractTypes.PORTABILITY]: 'Portabilidade',
  [ContractTypes.NEW_CONTRACT]: 'Novo Contrato',
}

export const ContractStatus = {
  ACTIVE: 'ativo',
  FINISHED: 'encerrado',
  CANCELED: 'cancelado',
  REVERSED: 'estornado',
  EFFECTIVED: 'efetivado',
  PENDING_DOC: 'pendente-de-documentacao',
  PENDING_SIGN: 'pendente-de-assinatura',
}

export const ContractStatusDescription = {
  [ContractStatus.ACTIVE]: 'Ativo',
  [ContractStatus.FINISHED]: 'Encerrado',
  [ContractStatus.CANCELED]: 'Cancelado',
  [ContractStatus.REVERSED]: 'Estornado',
  [ContractStatus.EFFECTIVED]: 'Efetivado',
  [ContractStatus.PENDING_DOC]: 'Pendente de Documentação',
  [ContractStatus.PENDING_SIGN]: 'Pendente de Assinatura',
}

export const ContractStatusColor = {
  [ContractStatus.ACTIVE]: 'success',
  [ContractStatus.FINISHED]: 'success',
  [ContractStatus.CANCELED]: 'danger',
  [ContractStatus.REVERSED]: 'danger',
  [ContractStatus.EFFECTIVED]: 'success',
  [ContractStatus.PENDING_DOC]: 'warning',
  [ContractStatus.PENDING_SIGN]: 'warning',
}
