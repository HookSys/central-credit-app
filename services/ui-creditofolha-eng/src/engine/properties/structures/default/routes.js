import { LazyLoading } from 'components'
import PERMISSIONS from 'engine/constants/permissions'

// Pages
const LoginPage = LazyLoading(() => import('pages/Default/Login'))
const ProfilesPage = LazyLoading(() => import('pages/Default/Profiles'))
const UseTermsPage = LazyLoading(() => import('pages/Default/UseTerms'))
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
      PERMISSIONS.USE_TERMS_ACCEPTED({ redirectTo: '/use-terms' }),
      PERMISSIONS.NO_SELECTED_PROFILE(),
    ],
  },
  USE_TERMS: {
    URL: '/use-terms',
    NAME: 'Termos de Uso',
    COMPONENT: UseTermsPage,
    VALIDATION: [
      PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
      PERMISSIONS.NO_USE_TERMS_ACCEPTED({ redirectTo: '/profiles' }),
    ],
  },
  REGISTRATION: {
    URL: '/registration',
    NAME: 'Quero me cadastrar',
    COMPONENT: RegistrationPage,
    ROUTES: {
      INDEX: {
        URL: '',
        NAME: 'Quero me Cadastrar',
        COMPONENT: RegistrationRegisterPage,
        VALIDATION: [PERMISSIONS.NOAUTH_REQUIRED({ redirectTo: '/profiles' })],
      },
      EMPLOYEE: {
        URL: '/employee',
        NAME: 'Cadastro de Conta',
        COMPONENT: RegistrationEmployeePage,
        VALIDATION: [PERMISSIONS.NOAUTH_REQUIRED({ redirectTo: '/profiles' })],
      },
      COMPANY: {
        URL: '/company',
        NAME: 'Cadastro de Empresa',
        COMPONENT: RegistrationCompanyPage,
        VALIDATION: [PERMISSIONS.NOAUTH_REQUIRED({ redirectTo: '/profiles' })],
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
