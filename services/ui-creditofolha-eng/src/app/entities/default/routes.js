// @flow
import { AUTH_REQUIRED } from 'constants/permission'
import LazyLoading from 'components/LazyLoading'

import type { TRouteComponent } from 'app/types'

// Pages
const LoginPage: TRouteComponent = LazyLoading(() => import('pages/Default/Login'))
const ProfilesPage: TRouteComponent = LazyLoading(() => import('pages/Default/Profiles'))
const UseTermsPage: TRouteComponent = LazyLoading(() => import('pages/Default/UseTerms'))
const RegistrationPage: TRouteComponent = LazyLoading(() => import('pages/Default/Registration'))
const RegistrationMenuPage: TRouteComponent = LazyLoading(() => import('pages/Default/Registration/Menu'))
const RegistrationRegisterPage: TRouteComponent = LazyLoading(() => import('pages/Default/Registration/Register'))
const RegistrationFeedbackPage: TRouteComponent = LazyLoading(() => import('pages/Default/Registration/Feedback'))

const DefaultRoutes = {
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
