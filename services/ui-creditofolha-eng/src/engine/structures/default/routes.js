import { LazyLoading } from 'components'

// Pages
const LoginPage = LazyLoading(() => import('pages/Default/Login'))

export default {
  LOGIN: {
    URL: '/login',
    NAME: 'Login',
    COMPONENT: LoginPage,
  },
  PROFILES: {
    URL: '/profiles',
    NAME: 'Perfil',
  },
}
