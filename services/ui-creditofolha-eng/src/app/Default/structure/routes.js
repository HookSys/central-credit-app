// @flow
import { AUTH_REQUIRED } from 'constants/permission'
import LazyLoading from 'components/LazyLoading'

// Pages
const LoginPage = LazyLoading(() => import('default/pages/Login'))
const ProfilesPage = LazyLoading(() => import('default/pages/Profiles'))
const UseTermsPage = LazyLoading(() => import('default/pages/UseTerms'))

const RegistrationPage = LazyLoading(() => import('default/pages/Registration'))
const RegistrationMenuPage = LazyLoading(() => import('default/pages/Registration/Menu'))
const RegistrationRegisterPage = LazyLoading(() => import('default/pages/Registration/Register'))
const RegistrationFeedbackPage = LazyLoading(() => import('default/pages/Registration/Feedback'))

const ResetPasswordPage = LazyLoading(() => import('default/pages/ResetPassword'))
const ResetPasswordFormPage = LazyLoading(() => import('default/pages/ResetPassword/Form'))
const ResetPasswordTokenPage = LazyLoading(() => import('default/pages/ResetPassword/Token'))
const ResetPasswordPasswordPage = LazyLoading(() => import('default/pages/ResetPassword/Password'))

export const DefaultRoutes = {
  LOGIN: {
    route: '/login',
    name: 'Login',
    component: LoginPage,
    permissions: [AUTH_REQUIRED],
  },
  PROFILES: {
    route: '/profiles',
    name: 'Perfil',
    component: ProfilesPage,
  },
  USE_TERMS: {
    route: '/use-terms',
    name: 'Termos de Uso',
    component: UseTermsPage,
  },
  REGISTRATION: {
    route: '/registration',
    name: 'Quero me cadastrar',
    component: RegistrationPage,
    routes: {
      INDEX: {
        route: '',
        name: 'Quero me Cadastrar',
        component: RegistrationMenuPage,
      },
      REGISTER: {
        route: '/register',
        name: 'Cadastro de Conta',
        component: RegistrationRegisterPage,
      },
      SUCCESS: {
        route: '/success',
        name: 'Cadastrado com Sucesso',
        component: RegistrationFeedbackPage,
        isFeedback: true,
      },
    },
  },
  RESET_PASSWORD: {
    route: '/reset-password',
    name: 'Recuperar Senha',
    component: ResetPasswordPage,
    routes: {
      INDEX: {
        route: '',
        name: '',
        component: ResetPasswordFormPage,
      },
      TOKEN: {
        route: '/token',
        name: 'Token',
        component: ResetPasswordTokenPage,
        isFeedback: true,
      },
      PASSWORD: {
        route: '/password',
        name: 'Nova Senha',
        component: ResetPasswordPasswordPage,
      },
    },
  },
}
export type TDefaultRoutes = typeof DefaultRoutes

export default DefaultRoutes
