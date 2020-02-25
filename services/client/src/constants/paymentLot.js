export const PAYMENT_LOT_STATUS = {
  OPEN: 'em-aberto',
  DIVERGENT_PAYMENT: 'retorno-pagamento-divergente',
  NEGOTIATED: 'negociado',
  CLOSED: 'fechado',
  SENT: 'enviado',
  PENDING: 'pendente',
  PAYMENT_RETURN: 'retorno-pagamento-divergente',
  CONCILIATED_AUTOMATICALLY: 'conciliado-automaticamente',
  CONCILIATED: 'conciliado',
  SUBMITTED: 'submetido',
  EXPIRED: 'expirado',
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
  [PAYMENT_LOT_STATUS.SUBMITTED]: 'Submetido',
  [PAYMENT_LOT_STATUS.PENDING]: 'Pendente',
  [PAYMENT_LOT_STATUS.CONCILIATED]: 'Conciliado',
  [PAYMENT_LOT_STATUS.CONCILIATED_AUTOMATICALLY]: 'Conciliado Automaticamente',
  [PAYMENT_LOT_STATUS.EXPIRED]: 'Expirado',
  [PAYMENT_LOT_STATUS.PAYMENT_RETURN]: 'Retorno pagamento divergente',
}

export const PAYMENT_LOT_STATUS_COLOR = {
  [PAYMENT_LOT_STATUS.SUBMITTED]: 'info',
  [PAYMENT_LOT_STATUS.PENDING]: 'warning',
  [PAYMENT_LOT_STATUS.CONCILIATED]: 'success',
  [PAYMENT_LOT_STATUS.CONCILIATED_AUTOMATICALLY]: 'success',
  [PAYMENT_LOT_STATUS.EXPIRED]: 'danger',
  [PAYMENT_LOT_STATUS.PAYMENT_RETURN]: 'danger',
}

export const PAYMENT_TYPES = {
  TED: 'ted',
  BILLET: 'boleto',
}

export const PAYMENT_DESCRIPTION = {
  [PAYMENT_TYPES.TED]: 'TED',
  [PAYMENT_TYPES.BILLET]: 'Boleto bancário',
}


export default PAYMENT_LOT_STATUS
