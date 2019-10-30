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

  widthSideBar: 0,
  updateWidthSideBar: () => {},
})

const SideBarProvider = ({ children }) => {
  const [isSideBarVisible, toggleSideBar] = useState(false)
  const [widthSideBar, updateWidthSideBar] = useState(0)

  return (
    <SideBarContext.Provider
      value={{
        isSideBarVisible,
        toggleSideBar,
        widthSideBar,
        updateWidthSideBar
      }}
    >
      { children }
    </SideBarContext.Provider>
  )
}

const SideBar = () => {
  const structure = useStructure()
  const { isSideBarVisible, widthSideBar } = useContext(SideBarContext)

  const { LOGO } = structure
  const style = !isSideBarVisible ? { minWidth: `${ widthSideBar }px` } : {}
  return (
    <nav
      className={ classNames('sidebar', {
        'active': isSideBarVisible,
      }) }
      style={ style }
    >
      <div className={ classNames('sidebar-logo px-2', LOGO.CLASSNAME) }>
        <SvgImage icon={ LOGO.ICON } maxWidth='310px' maxHeight='40px' />
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
