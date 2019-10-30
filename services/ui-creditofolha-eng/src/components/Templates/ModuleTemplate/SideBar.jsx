import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { SvgImage } from 'components'
import { useStructure } from 'engine'
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
  const { isSideBarVisible, widthSideBar } = useContext(SideBarContext)

  const { LOGO } = structure
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
      </div>
    </nav>
  )
}

export {
  SideBarProvider,
  SideBarContext,
}
export default SideBar
