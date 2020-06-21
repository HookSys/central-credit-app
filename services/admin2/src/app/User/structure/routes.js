// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, PublishOutlined } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('user/pages/Dashboard'))

const UploadPage = LazyLoading(() => import('user/pages/Upload'))
const UploadFormPage = LazyLoading(() => import('user/pages/Upload/Form'))


const UserRoutes = {
  INDEX: {
    route: '',
    name: 'Dashboard',
    component: DashboardPage,
    icon: () => HomeOutlined
  },
  UPLOAD: {
    route: '/upload',
    name: 'Envio de arquivos',
    component: UploadPage,
    icon: () => PublishOutlined,
    routes: {
      INDEX: {
        route: '',
        name: 'Formulário',
        component: UploadFormPage
      }
    }
  }
}

export type TUserRoutes = typeof UserRoutes

export default UserRoutes
