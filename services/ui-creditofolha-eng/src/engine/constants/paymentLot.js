export const PAYMENT_LOT_STATUS = {
  SUBMITED: 'submetido',
  PENDENT: 'pendente',
  CONCILIATED: 'conciliado',
  AUTO_CONCILIATED: 'conciliado-automaticamente',
  EXPIRED: 'expirado',
  RETURN_DIVERGENT_PAYMENT: 'retorno-pagamento-divergente',
}

export const PAYMENT_LOT_REASONS = {
  NONE: 'sem-divergencia',
  ALIMONY: 'pensao-alimenticia',
  VACATION: 'ferias',
  OTHERS: 'outros',
  DEMISSION: 'demissao',
  AWAY: 'afastado',
  INVALID: 'invalidez',
  DEAD: 'obito',
  FRAUD: 'fraude',
}

export const PAYMENT_LOT_REASONS_DESCRIPTION = {
  [PAYMENT_LOT_REASONS.NONE]: 'Sem Divergência',
  [PAYMENT_LOT_REASONS.ALIMONY]: 'Pensão Alimentícia',
  [PAYMENT_LOT_REASONS.VACATION]: 'Férias',
  [PAYMENT_LOT_REASONS.OTHERS]: 'Outros',
  [PAYMENT_LOT_REASONS.DEMISSION]: 'Demissão',
  [PAYMENT_LOT_REASONS.AWAY]: 'Afastado',
  [PAYMENT_LOT_REASONS.INVALID]: 'Invalidez',
  [PAYMENT_LOT_REASONS.DEAD]: 'Óbito',
  [PAYMENT_LOT_REASONS.FRAUD]: 'Fraude',
}

export const PAYMENT_LOT_STATUS_DESCRIPTION = {
  [PAYMENT_LOT_STATUS.SUBMITED]: 'Submetido',
  [PAYMENT_LOT_STATUS.PENDENT]: 'Pendente',
  [PAYMENT_LOT_STATUS.CONCILIATED]: 'Conciliado',
  [PAYMENT_LOT_STATUS.AUTO_CONCILIATED]: 'Conciliado Automaticamente',
  [PAYMENT_LOT_STATUS.EXPIRED]: 'Expirado',
  [PAYMENT_LOT_STATUS.RETURN_DIVERGENT_PAYMENT]: 'Retorno pagamento divergente',
}

export default PAYMENT_LOT_STATUS
