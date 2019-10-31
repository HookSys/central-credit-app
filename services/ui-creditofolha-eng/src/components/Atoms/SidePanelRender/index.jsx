import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { SideNavigationContext } from 'components/Templates/ModuleTemplate/SideNavigation'
import { SideBarContext } from 'components/Templates/ModuleTemplate/SideBar'

const SidePanelRender = ({ children }) => {
  const [portal, setPortal] = useState()
  const { toggleHasSidePanel } = useContext(SideNavigationContext)
  const { toggleSideBar } = useContext(SideBarContext)

  useLayoutEffect(() => {
    setPortal(document.getElementById('sidepanel-render'))
    toggleHasSidePanel(true)
    return () => {
      setPortal(null)
      toggleHasSidePanel(false)
      toggleSideBar(false)
    }
  }, [])

  useEffect(() => {
    if (portal) {
      toggleSideBar(true)
    }
  }, [portal])

  if (portal) {
    return ReactDOM.createPortal(children, portal)
  }

  return null
}

SidePanelRender.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SidePanelRender
