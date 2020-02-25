// @flow
import type { History } from 'react-router-dom'
import type { TServicesLoader, TReduxLoader, TThemesLoader,
  TEntityLoader, TPermissionsLoader, TImporterLoader, TCacheLoader,
  TExporterLoader } from './loaders'

export type TCore = {|
  Services: TServicesLoader,
  History: History,
  Redux: TReduxLoader,
  Themes: TThemesLoader,
  Entity: TEntityLoader,
  Permissions: TPermissionsLoader,
  Importer: TImporterLoader,
  Exporter: TExporterLoader,
  Cache: TCacheLoader,
|}

export type * from './loaders'
export type * from './entities'
export type * from './State'
