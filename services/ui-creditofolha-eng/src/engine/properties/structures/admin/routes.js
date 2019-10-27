import { Gamepad } from '@material-ui/icons'
import { LazyLoading } from 'components'

// Pages
const AdminPlayground = LazyLoading(() => import('pages/Admin/Playground'))

export default {
  INDEX: {
    URL: '',
    NAME: 'Playground',
    icon: () => Gamepad,
    COMPONENT: AdminPlayground,
  },
}
