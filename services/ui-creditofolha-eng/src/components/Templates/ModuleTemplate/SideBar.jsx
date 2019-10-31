import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SvgImage } from 'components'
import { useStructure, useEngine } from 'engine'
import { Menu, Search, AccountCircle, Notifications, KeyboardArrowDown } from '@material-ui/icons'

const SideBarContext = React.createContext({
  isSideBarVisible: false,
  toggleSideBar: () => {},
})

const SideBarProvider = ({ children }) => {
  const [isSideBarVisible, toggleSideBar] = useState(false)

  return (
    <SideBarContext.Provider
      value={ {
        isSideBarVisible,
        toggleSideBar,
      } }
    >
      { children }
    </SideBarContext.Provider>
  )
}

const SideBar = () => {
  const structure = useStructure()
  const location = useLocation()
  const { isRouteActive } = useEngine(engine => engine.helpers)
  const { isSideBarVisible, widthSideBar } = useContext(SideBarContext)

  const { LOGO, ROUTES, ENTRY } = structure
  return (
    <nav
      className={ classNames('sidebar', {
        'active': isSideBarVisible,
      }) }
    >
      <div className={ classNames('sidebar-logo', LOGO.CLASSNAME) }>
        <SvgImage icon={ LOGO.ICON } isOverflowHideen={ true }/>
      </div>
      <div className='sidebar-content'>
        { Object.keys(ROUTES).map((route) => {
          const Icon = ROUTES[route].ICON()
          const url = `${ ENTRY }${ ROUTES[route].URL }`
          return (
            <Link
              to={ url }
              key={ url }
              className={ classNames({
                'active': isRouteActive(location, ROUTES[route].URL, ENTRY),
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
