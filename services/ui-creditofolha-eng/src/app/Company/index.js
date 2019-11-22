// @flow
import { EEntityKeys } from 'constants/entity'

import EntityBuilder from 'builders/EntityBuilder'
import CompanyEntity from 'company/structure'

export default EntityBuilder(CompanyEntity, EEntityKeys.COMPANY)
