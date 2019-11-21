/* eslint-disable no-restricted-syntax */
// @flow
import type { TRoutes, TPages } from 'types'

export default function getPages(routes: TRoutes): TPages {
  let pages: TPages = {}
  for (const route of Object.keys(routes)) {
    if (routes[route].routes) {
      const { routes: subRoutes } = routes[route]
      const subPages: TPages = getPages(subRoutes)
      pages = {
        ...pages,
        [route]: subPages,
      }
    }
  }
  return pages
}
