import company from './company'
import employee from './employee'
import defaultSt from './default'

const MODULES = {
  COMPANY: 'empresa',
  EMPLOYEE: 'emprego',
  DEFAULT: 'default',
}

export default () => ({
  [MODULES.COMPANY]: company,
  [MODULES.EMPLOYEE]: employee,
  [MODULES.DEFAULT]: defaultSt,
  MODULES,
})
