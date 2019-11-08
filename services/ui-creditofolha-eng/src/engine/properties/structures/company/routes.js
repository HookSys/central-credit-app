import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('pages/Company/Dashboard'))
const EmployeesPage = LazyLoading(() => import('pages/Company/Employees'))
const ContractsPage = LazyLoading(() => import('pages/Company/Contracts'))
const ContractsIndexPage = LazyLoading(() => import('pages/Company/Contracts/Contracts'))
const ContractsListPage = LazyLoading(() => import('pages/Company/Contracts/List'))
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
    SIDEPANEL_ROUTES: {
      INDEX: {
        URL: '',
        NAME: 'Index',
        COMPONENT: ContractsIndexPage,
      },
      LIST: {
        URL: '/list',
        NAME: 'List',
        COMPONENT: ContractsListPage,
      },
    },
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
