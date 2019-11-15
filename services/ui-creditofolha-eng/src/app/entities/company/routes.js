// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

import type { TRoutes, TRouteComponent } from 'app/types'

// Pages
const DashboardPage: TRouteComponent = LazyLoading(() => import('pages/Company/Dashboard'))
const EmployeesPage: TRouteComponent = LazyLoading(() => import('pages/Company/Employees'))
const ContractsPage: TRouteComponent = LazyLoading(() => import('pages/Company/Contracts'))
const ContractsIndexPage: TRouteComponent = LazyLoading(() => import('pages/Company/Contracts/Contracts'))
const ContractsListPage: TRouteComponent = LazyLoading(() => import('pages/Company/Contracts/List'))
const RepassPage: TRouteComponent = LazyLoading(() => import('pages/Company/Repass'))
const UsersPage: TRouteComponent = LazyLoading(() => import('pages/Company/Users'))
const CovenantPage: TRouteComponent = LazyLoading(() => import('pages/Company/Covenant'))

const CompanyRoutes = {
  DASHBOARD: {
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

export default (CompanyRoutes: TRoutes)
