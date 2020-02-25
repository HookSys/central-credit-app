// @flow
import type { TRoute } from 'types/entities'
import type { Location } from 'react-router-dom'

export type TLocation = Location & {
  getStructure(): TRoute,
}
