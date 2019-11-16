// @flow
import { EEntityKeys } from 'constants/entity'

import EntityBuilder from 'builders/EntityBuilder'
import DefaultEntity from 'default/structure'

const DefaultEntityInstance = EntityBuilder(DefaultEntity, EEntityKeys.DEFAULT)

export default DefaultEntityInstance
