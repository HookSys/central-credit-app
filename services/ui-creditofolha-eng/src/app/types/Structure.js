// @flow
import type { StructureType } from 'constants/structure'
import type { ComponentType } from 'react'

export type StructureLogo = {
  svg: string,
  className?: string,
}

export type StructureProps = {
  route: string,
  name: string,
  component: ComponentType<any>,
  permissions?: Array<string>,
  routes?: { [key: string]: StructureProps },
  isFeedback?: boolean,
}

export type StructureRoute = { [key: string]: StructureProps }

export type StructurePages = { [key: string]: string | StructurePages }
export type StructurePagesWithRoute<R> = { [key: R]: string | StructurePagesWithRoute<R> }

export type RefStructurePages = { current: StructurePages }

export type Structure = {
  name: string,
  theme: string,
  entry: string,
  type: StructureType,
  component: ComponentType<any>,
  logo?: StructureLogo,
  small?: StructureLogo,
  permissions?: Array<string>,
  routes?: { [key: string]: StructureProps },
  pages: RefStructurePages,
}
