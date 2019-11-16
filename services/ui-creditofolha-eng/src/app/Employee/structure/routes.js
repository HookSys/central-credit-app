import { LazyLoading } from 'components'
import { HomeOutlined, Receipt, CompareArrows, MergeType, CallReceived, AttachMoney, Refresh } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('pages/Employee/Dashboard'))
const CreditRequestPage = LazyLoading(() => import('pages/Employee/CreditRequest'))
const HistoryPage = LazyLoading(() => import('pages/Employee/History'))
const RepassPage = LazyLoading(() => import('pages/Employee/Repass'))
const AccountPage = LazyLoading(() => import('pages/Employee/Account'))
const RenegotiationPage = LazyLoading(() => import('pages/Employee/Renegotiation'))
const PortabilityPage = LazyLoading(() => import('pages/Employee/Portability'))

export default {
  INDEX: {
    URL: '',
    NAME: 'Início',
    COMPONENT: DashboardPage,
    ICON: () => HomeOutlined,
  },
  CREDIT: {
    URL: '/credit',
    NAME: 'Contratar Crédito',
    COMPONENT: CreditRequestPage,
    ICON: () => AttachMoney,
  },
  HISTORY: {
    URL: '/history',
    NAME: 'Consultas',
    COMPONENT: HistoryPage,
    ICON: () => Receipt,
  },
  DISCOUNT_TRANSFER: {
    URL: '/discount-transfer',
    NAME: 'Repasse',
    COMPONENT: RepassPage,
    ICON: () => CompareArrows,
  },
  ACCOUNT: {
    URL: '/account',
    NAME: 'Atualizar Dados',
    COMPONENT: AccountPage,
    ICON: () => Refresh,
  },
  RENEGOTIATE: {
    URL: '/renegotiate',
    NAME: 'Renegociar',
    COMPONENT: RenegotiationPage,
    ICON: () => MergeType,
  },
  PORTABILITY: {
    URL: '/portability',
    NAME: 'Portabilidade',
    COMPONENT: PortabilityPage,
    ICON: () => CallReceived,
  },
}
