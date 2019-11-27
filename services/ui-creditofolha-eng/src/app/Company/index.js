// @flow
import { EEntityKeys } from 'constants/entity'

import EntityBuilder from 'builders/EntityBuilder'
import CompanyEntity from 'company/structure'

const CompanyEntityInstance = EntityBuilder(CompanyEntity, EEntityKeys.COMPANY)

export default CompanyEntityInstance
