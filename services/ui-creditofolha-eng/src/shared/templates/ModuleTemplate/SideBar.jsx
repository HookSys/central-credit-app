import React, { useContext, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import SvgImage from 'components/SvgImage'
import { useStructure, useLeftSwipe } from 'hooks'
import { Menu } from '@material-ui/icons'
import { isRouteActive } from 'helpers'

import { SideNavigationContext } from './SideNavigation'

const SideBarContext = React.createContext({
  isSideBarCollapsed: false,
  toggleSideBar: () => {},
})

const SideBarProvider = ({ children }) => {
  const [isSideBarCollapsed, toggleSideBar] = useState(false)

  return (
    <SideBarContext.Provider
      value={ {
        isSideBarCollapsed,
        toggleSideBar,
      } }
    >
      { children }
    </SideBarContext.Provider>
  )
}

SideBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function getFirstValidRoute(pages, route) {
  if (typeof pages[route] !== 'object') {
    return pages[route]
  }

  return getFirstValidRoute(pages[route], 'INDEX')
}

const SideBar = () => {
  const structure = useStructure()
  const location = useLocation()
  const { isSideBarCollapsed, toggleSideBar } = useContext(SideBarContext)
  const { hasSidePanel, toggleSideNavigation } = useContext(SideNavigationContext)

  const sidebarRef = useRef()
  useLeftSwipe(useCallback(() => {
    if (hasSidePanel) {
      toggleSideBar(true)
    } else {
      toggleSideNavigation(false)
    }
  }, [hasSidePanel]), sidebarRef)

  const { logo, pages, routes } = structure
  return (
    <nav
      ref={ sidebarRef }
      className={ classNames('sidebar', {
        'collapsed': isSideBarCollapsed,
      }) }
    >
      <div className={ classNames('sidebar-logo', logo.className) }>
        <SvgImage icon={ logo.svg } isOverflowHideen={ true } className='sidebar-logo-svg' />
        <Menu
          onClick={ () => toggleSideBar(!isSideBarCollapsed) }
          className={ classNames('sidebar-menu-collapse', {
            'has-sidepanel': hasSidePanel,
          }) }
        />
      </div>
      <div className='sidebar-content pt-1'>
        { Object.keys(routes).map((route) => {
          if (routes[route].hideMenu) {
            return null
          }

          const Icon = routes[route].icon()
          const url = getFirstValidRoute(pages, route)
          return (
            <Link
              to={ url }
              key={ url }
              className={ classNames({
                'active': isRouteActive(location, url, route),
              }) }
            >
              <Icon />
              <span>{ routes[route].name }</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export {
  SideBarProvider,
  SideBarContext,
}
export default SideBar
