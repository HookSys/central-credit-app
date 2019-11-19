// @flow
import type { History } from 'react-router-dom'
import type { TServicesLoader, TReduxLoader, TThemesLoader, TEntityLoader, TPermissionsLoader } from './loaders'

export type TCore = {|
  Services: TServicesLoader,
  History: History,
  Redux: TReduxLoader,
  Themes: TThemesLoader,
  Entity: TEntityLoader,
  Permissions: TPermissionsLoader
|}

export type * from './loaders'
export type * from './entities'
export type * from './State'
