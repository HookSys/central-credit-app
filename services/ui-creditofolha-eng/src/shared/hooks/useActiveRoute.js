/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { get } from 'lodash'

import useStructure from './useStructure'

function getPathKeysOf(pages, pathname, parent = '') {
  for (const page in pages) {
    const path = parent === '' ? page : `${ parent }.routes.${ page }`
    if (typeof pages[page] === 'object') {
      return getPathKeysOf(pages[page], pathname, path)
    }
    if (pages[page] === pathname) {
      return path
    }
  }

  return ''
}

function useActiveRoute() {
  const lastPathname = useRef()
  const lastActiveRoute = useRef()

  const structure = useStructure()
  const location = useLocation()

  const { pathname } = location

  if (pathname !== lastPathname.current) {
    const { pages, routes } = structure
    const activePath = getPathKeysOf(pages, pathname)
    const routeObj = get(routes, activePath)
    lastPathname.current = pathname
    lastActiveRoute.current = routeObj
  }

  return lastActiveRoute.current
}

export default useActiveRoute
