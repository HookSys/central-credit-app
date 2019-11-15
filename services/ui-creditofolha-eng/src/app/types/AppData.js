// @flow
import type { History } from 'react-router-dom'
import type { Services } from './Services'
import type { Redux } from './Redux'
import type { Themes } from './Themes'
import type { Entity } from './Entity'
import type { Permissions } from './Permission'

export type AppData = {|
  Services: Services,
  History: History,
  Redux: Redux,
  Themes: Themes,
  Entity: Entity,
  Permissions: Permissions
|}
