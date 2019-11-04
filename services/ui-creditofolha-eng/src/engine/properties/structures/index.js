import MODULES from 'engine/constants/modules'

import company from './company'
import employee from './employee'
import defaultSt from './default'
import admin from './admin'

export default () => ({
  [MODULES.COMPANY]: company,
  [MODULES.EMPLOYEE]: employee,
  [MODULES.DEFAULT]: defaultSt,
  [MODULES.ADMIN]: admin,
  MODULES,
})
