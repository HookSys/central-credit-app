import React, { useContext, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { SvgImage } from 'components'
import { useStructure, useEngine, useLeftSwipe } from 'engine'
import { Menu } from '@material-ui/icons'

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

const SideBar = () => {
  const structure = useStructure()
  const location = useLocation()
  const { isRouteActive } = useEngine(engine => engine.helpers)
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

  const { LOGO, ROUTES, ENTRY } = structure
  return (
    <nav
      ref={ sidebarRef }
      className={ classNames('sidebar', {
        'collapsed': isSideBarCollapsed,
      }) }
    >
      <div className={ classNames('sidebar-logo', LOGO.CLASSNAME) }>
        <SvgImage icon={ LOGO.ICON } isOverflowHideen={ true } className='sidebar-logo-svg' />
        <Menu
          onClick={ () => toggleSideBar(!isSideBarCollapsed) }
          className={ classNames('sidebar-menu-collapse', {
            'has-sidepanel': hasSidePanel,
          }) }
        />
      </div>
      <div className='sidebar-content pt-1'>
        { Object.keys(ROUTES).map((route) => {
          const Icon = ROUTES[route].ICON()
          const url = `${ ENTRY }${ ROUTES[route].URL }`
          return (
            <Link
              to={ url }
              key={ url }
              className={ classNames({
                'active': isRouteActive(location, url, route),
              }) }
            >
              <Icon />
              <span>{ ROUTES[route].NAME }</span>
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
