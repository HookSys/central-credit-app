// @flow
import { EEntityKeys } from 'constants/entity'

import EntityBuilder from 'builders/EntityBuilder'
import EmployeeEntity from 'employee/structure'

const EmployeeEntityInstance = EntityBuilder(EmployeeEntity, EEntityKeys.EMPLOYEE)

export default EmployeeEntityInstance
