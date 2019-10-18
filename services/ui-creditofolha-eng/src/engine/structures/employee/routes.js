import { HomeOutlined, Receipt, CompareArrows, MergeType, CallReceived, AttachMoney, Refresh } from '@material-ui/icons'

export default {
  INDEX: {
    URL: '',
    NAME: 'Início',
    icon: () => HomeOutlined,
  },
  CREDIT: {
    URL: '/credit',
    NAME: 'Contratar Crédito',
    icon: () => AttachMoney,
  },
  HISTORY: {
    URL: '/history',
    NAME: 'Consultas',
    icon: () => Receipt,
  },
  DISCOUNT_TRANSFER: {
    URL: '/discount-transfer',
    NAME: 'Repasse',
    icon: () => CompareArrows,
  },
  ACCOUNT: {
    URL: '/account',
    NAME: 'Atualizar Dados',
    icon: () => Refresh,
  },
  RENEGOTIATE: {
    URL: '/renegotiate',
    NAME: 'Renegociar',
    icon: () => MergeType,
  },
  PORTABILITY: {
    URL: '/portability',
    NAME: 'Portabilidade',
    icon: () => CallReceived,
  },
}
