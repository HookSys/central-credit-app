import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

export default {
  INDEX: {
    URL: '',
    NAME: 'Início',
    icon: () => HomeOutlined,
  },
  EMPLOYEES: {
    URL: '/employees',
    NAME: 'Funcionários',
    icon: () => SupervisorAccount,
  },
  CONTRACTS: {
    URL: '/contracts',
    NAME: 'Contratos',
    icon: () => Receipt,
  },
  DISCOUNT_TRANSFER: {
    URL: '/discount-transfer',
    NAME: 'Repasse',
    icon: () => CompareArrows,
  },
  USERS: {
    URL: '/users',
    NAME: 'Usuários',
    icon: () => PermContactCalendar,
  },
  COVENANT: {
    URL: '/covenant',
    NAME: 'Convênio',
    icon: () => AccountBalance,
  },
}
