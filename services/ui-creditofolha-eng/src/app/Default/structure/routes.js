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
}
export type TDefaultRoutes = typeof DefaultRoutes

export default DefaultRoutes
