// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('company/pages/Dashboard'))

const EmployeesPage = LazyLoading(() => import('company/pages/Employees'))
const EmployeesListPage = LazyLoading(() => import('company/pages/Employees/List'))
const EmployeesDemissionPage = LazyLoading(() => import('company/pages/Employees/Demission'))
const EmployeesImportPage = LazyLoading(() => import('company/pages/Employees/Import'))

const ContractsPage = LazyLoading(() => import('company/pages/Contracts'))
const ContractsIndexPage = LazyLoading(() => import('company/pages/Contracts/Contracts'))
const ContractsListPage = LazyLoading(() => import('company/pages/Contracts/List'))

const RepassPage = LazyLoading(() => import('company/pages/Repass'))
const UsersPage = LazyLoading(() => import('company/pages/Users'))
const CovenantPage = LazyLoading(() => import('company/pages/Covenant'))

const CompanyRoutes = {
  INDEX: {
    route: '',
    name: 'Início',
    component: DashboardPage,
    icon: () => HomeOutlined,
  },
  EMPLOYEES: {
    route: '/employees',
    name: 'Funcionários',
    component: EmployeesPage,
    icon: () => SupervisorAccount,
    routes: {
      INDEX: {
        route: '',
        name: 'Quadro de Funcionários',
        component: EmployeesListPage,
      },
      DEMISSION: {
        route: '/demission',
        name: 'Demissão',
        component: EmployeesDemissionPage,
      },
      IMPORT: {
        route: '/import',
        name: 'Importar',
        component: EmployeesImportPage,
      },
    },
  },
  CONTRACTS: {
    route: '/contracts',
    name: 'Contratos',
    component: ContractsPage,
    icon: () => Receipt,
    routes: {
      INDEX: {
        route: '',
        name: 'Index',
        component: ContractsIndexPage,
      },
      LIST: {
        route: '/list',
        name: 'List',
        component: ContractsListPage,
      },
    },
  },
  DISCOUNT_TRANSFER: {
    route: '/discount-transfer',
    name: 'Repasse',
    component: RepassPage,
    icon: () => CompareArrows,
  },
  USERS: {
    route: '/users',
    name: 'Usuários',
    component: UsersPage,
    icon: () => PermContactCalendar,
  },
  COVENANT: {
    route: '/covenant',
    name: 'Convênio',
    component: CovenantPage,
    icon: () => AccountBalance,
  },
}

export type TCompanyRoutes = typeof CompanyRoutes

export default CompanyRoutes
