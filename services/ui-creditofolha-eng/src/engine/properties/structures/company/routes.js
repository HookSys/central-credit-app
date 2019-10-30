import { LazyLoading } from 'components'
import PERMISSIONS from 'engine/constants/permissions'
import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('pages/Company/Dashboard'))
const EmployeesPage = LazyLoading(() => import('pages/Company/Employees'))
const ContractsPage = LazyLoading(() => import('pages/Company/Contracts'))
const RepassPage = LazyLoading(() => import('pages/Company/Repass'))
const UsersPage = LazyLoading(() => import('pages/Company/Users'))
const CovenantPage = LazyLoading(() => import('pages/Company/Covenant'))

export default {
  INDEX: {
    URL: '',
    NAME: 'Início',
    COMPONENT: DashboardPage,
    ICON: () => HomeOutlined,
  },
  EMPLOYEES: {
    URL: '/employees',
    NAME: 'Funcionários',
    COMPONENT: EmployeesPage,
    ICON: () => SupervisorAccount,
  },
  CONTRACTS: {
    URL: '/contracts',
    NAME: 'Contratos',
    COMPONENT: ContractsPage,
    ICON: () => Receipt,
  },
  DISCOUNT_TRANSFER: {
    URL: '/discount-transfer',
    NAME: 'Repasse',
    COMPONENT: RepassPage,
    ICON: () => CompareArrows,
  },
  USERS: {
    URL: '/users',
    NAME: 'Usuários',
    COMPONENT: UsersPage,
    ICON: () => PermContactCalendar,
  },
  COVENANT: {
    URL: '/covenant',
    NAME: 'Convênio',
    COMPONENT: CovenantPage,
    ICON: () => AccountBalance,
  },
}