// @flow

import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, BusinessOutlined, CreateOutlined, PublishOutlined, PermContactCalendar } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('admin/pages/Dashboard'))

const GeneratePage = LazyLoading(() => import('admin/pages/Generate'))

const UploadPage = LazyLoading(() => import('admin/pages/Upload'))
const UploadFormPage = LazyLoading(() => import('admin/pages/Upload/Form'))

const CompanyPage = LazyLoading(() => import('admin/pages/Company'))
const CompanyListPage = LazyLoading(() => import('admin/pages/Company/List'))
const CompanyFormPage = LazyLoading(() => import('admin/pages/Company/Form'))

const UsersPage = LazyLoading(() => import('admin/pages/Users'))
const UsersListPage = LazyLoading(() => import('admin/pages/Users/List'))
const UsersViewPage = LazyLoading(() => import('admin/pages/Users/View'))
const UsersFormPage = LazyLoading(() => import('admin/pages/Users/Form'))


const AdminRoutes = {
  INDEX: {
    route: '',
    name: 'Dashboard',
    component: DashboardPage,
    icon: () => HomeOutlined
  },
  GENERATE: {
    route: '/generate',
    name: 'Gerar Títulos',
    component: GeneratePage,
    icon: () => CreateOutlined
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
  },
  COMPANIES: {
    route: '/companies',
    name: 'Empresas',
    component: CompanyPage,
    icon: () => BusinessOutlined,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: CompanyListPage
      },
      EDIT: {
        route: '/:companyId',
        name: 'Editar',
        component: CompanyFormPage,
        hideMenu: true
      },
      NEW: {
        route: '/new',
        name: 'Cadastro',
        component: CompanyFormPage,
        hideMenu: true
      }
    }
  },
  USERS: {
    route: '/users',
    name: 'Usuários',
    component: UsersPage,
    icon: () => PermContactCalendar,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: UsersListPage
      },
      VIEW: {
        route: '/view/:userId',
        name: 'Detalhes',
        component: UsersViewPage,
        hideMenu: true
      },
      NEW: {
        route: '/new',
        name: 'Novo',
        component: UsersFormPage,
        hideMenu: true
      },
      EDIT: {
        route: '/edit/:userId',
        name: 'Editar',
        component: UsersFormPage,
        hideMenu: true
      }
    }
  }
}

export type TAdminRoutes = typeof AdminRoutes

export default AdminRoutes
