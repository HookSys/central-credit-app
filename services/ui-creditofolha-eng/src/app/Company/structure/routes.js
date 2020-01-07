// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, SupervisorAccount, Receipt, CompareArrows, PermContactCalendar, AccountBalance } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('company/pages/Dashboard'))

const EmployeesPage = LazyLoading(() => import('company/pages/Employees'))
const EmployeesListPage = LazyLoading(() => import('company/pages/Employees/List'))
const EmployeesDemissionPage = LazyLoading(() => import('company/pages/Employees/Demission'))
const EmployeesDemissionListPage = LazyLoading(() => import('company/pages/Employees/Demission/List'))
const EmployeesDemissionInformPage = LazyLoading(() => import('company/pages/Employees/Demission/Inform'))
const EmployeesDemissionSuccessPage = LazyLoading(() => import('company/pages/Employees/Demission/Success'))

const EmployeesImportPage = LazyLoading(() => import('company/pages/Employees/Import'))
const EmployeesViewPage = LazyLoading(() => import('company/pages/Employees/View'))
const EmployeesFormPage = LazyLoading(() => import('company/pages/Employees/Form'))

const ContractsPage = LazyLoading(() => import('company/pages/Contracts'))
const ContractsIndexPage = LazyLoading(() => import('company/pages/Contracts/Contracts'))
const ContractsListPage = LazyLoading(() => import('company/pages/Contracts/List'))

const RepassPage = LazyLoading(() => import('company/pages/Repass'))
const RepassDiscountPage = LazyLoading(() => import('company/pages/Repass/Discount'))
const RepassDiscountListPage = LazyLoading(() => import('company/pages/Repass/Discount/List'))
const RepassDiscountInfosPage = LazyLoading(() => import('company/pages/Repass/Discount/Infos'))
const RepassDiscountEmptyPage = LazyLoading(() => import('company/pages/Repass/Discount/Empty'))
const RepassDiscountSuccessPage = LazyLoading(() => import('company/pages/Repass/Discount/Success'))
const RepassDetailPage = LazyLoading(() => import('company/pages/Repass/Detail'))
const RepassDetailListPage = LazyLoading(() => import('company/pages/Repass/Detail/List'))
const RepassDetailViewPage = LazyLoading(() => import('company/pages/Repass/Detail/View'))

const UsersPage = LazyLoading(() => import('company/pages/Users'))
const CovenantPage = LazyLoading(() => import('company/pages/Covenant'))

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

const CompanyRoutes = {
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
        routes: {
          INDEX: {
            route: '',
            name: 'Demissão de funcionários',
            component: EmployeesDemissionListPage,
            hideMenu: true,
          },
          INFORM: {
            route: '/:employeeId',
            name: 'Informar demissão',
            component: EmployeesDemissionInformPage,
            hideMenu: true,
          },
          SUCCESS: {
            route: '/success',
            name: 'Sucesso',
            component: EmployeesDemissionSuccessPage,
            hideMenu: true,
            isFeedback: true,
          },
        },
      },
      IMPORT: {
        route: '/import',
        name: 'Importar',
        component: EmployeesImportPage,
      },
      VIEW: {
        route: '/view/:employeeId',
        name: 'Detalhes',
        component: EmployeesViewPage,
        hideMenu: true,
      },
      NEW: {
        route: '/new',
        name: 'Novo',
        component: EmployeesFormPage,
        hideMenu: true,
      },
      EDIT: {
        route: '/edit/:employeeId',
        name: 'Editar',
        component: EmployeesFormPage,
        hideMenu: true,
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
  REPASS: {
    route: '/discount-transfer',
    name: 'Repasse',
    component: RepassPage,
    icon: () => CompareArrows,
    routes: {
      INDEX: {
        route: '',
        name: 'Desconto em folha',
        component: RepassDiscountPage,
        routes: {
          INDEX: {
            route: '',
            name: 'Lista',
            component: RepassDiscountListPage,
            hideMenu: true,
            isNotIndex: true,
          },
          SUCCESS: {
            route: '/success',
            name: 'Sucesso!',
            component: RepassDiscountSuccessPage,
            hideMenu: true,
            isFeedback: true,
          },
          INFOS: {
            route: '/infos',
            name: 'Informações',
            component: RepassDiscountInfosPage,
            hideMenu: true,
            isNotIndex: true,
          },
          EMPTY: {
            route: '/empty',
            name: 'Lote vazio',
            component: RepassDiscountEmptyPage,
            hideMenu: true,
            isNotIndex: true,
          },
        },
      },
      DETAIL: {
        route: '/detail',
        name: 'Detalhamento',
        component: RepassDetailPage,
        routes: {
          INDEX: {
            route: '',
            name: 'Lista',
            component: RepassDetailListPage,
            hideMenu: true,
          },
          VIEW: {
            route: '/:paymentLotMonth',
            name: 'Detalhe',
            component: RepassDetailViewPage,
            hideMenu: true,
          },
        },
      },
    },
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
