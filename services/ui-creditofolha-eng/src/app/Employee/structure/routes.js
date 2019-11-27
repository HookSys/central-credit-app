// @flow

import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, Receipt, CompareArrows, MergeType, CallReceived, AttachMoney, Refresh } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('employee/pages/Dashboard'))
const CreditRequestPage = LazyLoading(() => import('employee/pages/Credit'))
const HistoryPage = LazyLoading(() => import('employee/pages/History'))
const RepassPage = LazyLoading(() => import('employee/pages/Repass'))
const AccountPage = LazyLoading(() => import('employee/pages/Account'))
const RenegotiationPage = LazyLoading(() => import('employee/pages/Renegotiation'))
const PortabilityPage = LazyLoading(() => import('employee/pages/Portability'))

const EmployeeRoutes = {
  INDEX: {
    route: '',
    name: 'Início',
    component: DashboardPage,
    icon: () => HomeOutlined,
  },
  CREDIT: {
    route: '/credit',
    name: 'Contratar Crédito',
    component: CreditRequestPage,
    icon: () => AttachMoney,
  },
  HISTORY: {
    route: '/history',
    name: 'Consultas',
    component: HistoryPage,
    icon: () => Receipt,
  },
  DISCOUNT_TRANSFER: {
    route: '/discount-transfer',
    name: 'Repasse',
    component: RepassPage,
    icon: () => CompareArrows,
  },
  ACCOUNT: {
    route: '/account',
    name: 'Atualizar Dados',
    component: AccountPage,
    icon: () => Refresh,
  },
  RENEGOTIATE: {
    route: '/renegotiate',
    name: 'Renegociar',
    component: RenegotiationPage,
    icon: () => MergeType,
  },
  PORTABILITY: {
    route: '/portability',
    name: 'Portabilidade',
    component: PortabilityPage,
    icon: () => CallReceived,
  },
}

export type TEmployeeRoutes = typeof EmployeeRoutes

export default EmployeeRoutes
