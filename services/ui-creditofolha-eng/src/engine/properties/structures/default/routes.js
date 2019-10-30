import { LazyLoading } from 'components'
import PERMISSIONS from 'engine/constants/permissions'

// Pages
const LoginPage = LazyLoading(() => import('pages/Default/Login'))
const ProfilesPage = LazyLoading(() => import('pages/Default/Profiles'))
const RegistrationPage = LazyLoading(() => import('pages/Default/Registration'))
const RegistrationRegisterPage = LazyLoading(() => import('pages/Default/Registration/Register'))
const RegistrationEmployeePage = LazyLoading(() => import('pages/Default/Registration/Employee'))
const RegistrationCompanyPage = LazyLoading(() => import('pages/Default/Registration/Company'))
const RegistrationFeedbackPage = LazyLoading(() => import('pages/Default/Registration/Feedback'))

export default {
  LOGIN: {
    URL: '/login',
    NAME: 'Login',
    COMPONENT: LoginPage,
    VALIDATION: [PERMISSIONS.NOAUTH_REQUIRED({ redirectTo: '/profiles' })],
  },
  PROFILES: {
    URL: '/profiles',
    NAME: 'Perfil',
    COMPONENT: ProfilesPage,
    VALIDATION: [
      PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
      PERMISSIONS.NO_SELECTED_PROFILE(),
    ],
  },
  REGISTRATION: {
    URL: '/registration',
    NAME: 'Quero me cadastrar',
    COMPONENT: RegistrationPage,
    VALIDATION: [PERMISSIONS.NOAUTH_REQUIRED({ redirectTo: '/profiles' })],
    ROUTES: {
      INDEX: {
        URL: '',
        NAME: 'Quero me Cadastrar',
        COMPONENT: RegistrationRegisterPage,
      },
      EMPLOYEE: {
        URL: '/employee',
        NAME: 'Cadastro de Conta',
        COMPONENT: RegistrationEmployeePage,
      },
      COMPANY: {
        URL: '/company',
        NAME: 'Cadastro de Empresa',
        COMPONENT: RegistrationCompanyPage,
      },
      SUCCESS: {
        URL: '/success',
        NAME: 'Cadastrado com Sucesso',
        COMPONENT: RegistrationFeedbackPage,
        VALIDATION: [PERMISSIONS.RECENTLY_CREATED({ redirectTo: '/login' })],
        IS_FEEDBACK: true,
      },
    },
  },
}
