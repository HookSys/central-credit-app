// @flow
import LazyLoading from 'components/LazyLoading'

import type { StructureRoute } from 'app/types'
import { AUTH_REQUIRED } from 'constants/permission'

// Pages
const LoginPage = LazyLoading(() => import('pages/Default/Login'))
const ProfilesPage = LazyLoading(() => import('pages/Default/Profiles'))
const UseTermsPage = LazyLoading(() => import('pages/Default/UseTerms'))
const RegistrationPage = LazyLoading(() => import('pages/Default/Registration'))
const RegistrationMenuPage = LazyLoading(() => import('pages/Default/Registration/Menu'))
const RegistrationRegisterPage = LazyLoading(() => import('pages/Default/Registration/Register'))
const RegistrationFeedbackPage = LazyLoading(() => import('pages/Default/Registration/Feedback'))

const defaultRoutes: StructureRoute = {
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

export type DefaultRoutesType = $Keys<typeof defaultRoutes>

export default defaultRoutes
