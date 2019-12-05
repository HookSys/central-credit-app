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

const MyAccountPage = LazyLoading(() => import('default/pages/MyAccount'))
const MyAccountVerifiedPage = LazyLoading(() => import('default/pages/MyAccount/Verified'))
const MyAccountEmailPage = LazyLoading(() => import('default/pages/MyAccount/Email'))
const MyAccountEmailFormPage = LazyLoading(() => import('default/pages/MyAccount/Email/Form'))
const MyAccountEmailTokenPage = LazyLoading(() => import('default/pages/MyAccount/Email/Token'))
const MyAccountEmailConfirmPage = LazyLoading(() => import('default/pages/MyAccount/Email/Confirm'))
const MyAccountContactPage = LazyLoading(() => import('default/pages/MyAccount/Contact'))
const MyAccountContactFormPage = LazyLoading(() => import('default/pages/MyAccount/Contact/Form'))
const MyAccountContactTokenPage = LazyLoading(() => import('default/pages/MyAccount/Contact/Token'))
const MyAccountContactConfirmPage = LazyLoading(() => import('default/pages/MyAccount/Contact/Confirm'))
const MyAccountPasswordPage = LazyLoading(() => import('default/pages/MyAccount/Password'))

const EmployeeRoutes = {
  INDEX: {
    route: '',
    name: 'Início',
    component: DashboardPage,
    icon: () => HomeOutlined,
  },
  MY_ACCOUNT: {
    route: '/my-account',
    name: 'Minha Conta',
    hideMenu: true,
    component: MyAccountPage,
    routes: {
      INDEX: {
        route: '',
        name: 'Informações',
        component: MyAccountVerifiedPage,
      },
      EMAIL: {
        route: '/email',
        name: 'E-mail',
        component: MyAccountEmailPage,
        routes: {
          INDEX: {
            route: '',
            name: 'Confirmar Email',
            component: MyAccountEmailFormPage,
          },
          TOKEN: {
            route: '/token',
            name: 'Inserir o token',
            component: MyAccountEmailTokenPage,
          },
          CONFIRM: {
            route: '/confirm',
            name: 'Confirmar alteração',
            component: MyAccountEmailConfirmPage,
          },
        },
      },
      CONTACT: {
        route: '/contact',
        name: 'Contato',
        component: MyAccountContactPage,
        routes: {
          INDEX: {
            route: '',
            name: 'Confirmar Telefone',
            component: MyAccountContactFormPage,
          },
          TOKEN: {
            route: '/token',
            name: 'Inserir o token',
            component: MyAccountContactTokenPage,
          },
          CONFIRM: {
            route: '/confirm',
            name: 'Confirmar alteração',
            component: MyAccountContactConfirmPage,
          },
        },
      },
      PASSWORD: {
        route: '/password',
        name: 'Redefinir Senha',
        component: MyAccountPasswordPage,
      },
    },
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
