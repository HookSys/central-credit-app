import company from './company'
import employee from './employee'
import defaultSt from './default'
import admin from './admin'

const MODULES = {
  COMPANY: 'empresa',
  EMPLOYEE: 'emprego',
  DEFAULT: 'default',
  ADMIN: 'admin',
}

export default () => ({
  [MODULES.COMPANY]: company,
  [MODULES.EMPLOYEE]: employee,
  [MODULES.DEFAULT]: defaultSt,
  [MODULES.ADMIN]: admin,
  MODULES,
})
