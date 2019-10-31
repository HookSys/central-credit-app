import React, { useContext } from 'react'
import classNames from 'classnames'

import { SideBarContext } from './SideBar'

const SidePanel = () => {
  const { isSideBarCollapsed } = useContext(SideBarContext)

  return (
    <div
      className={ classNames('sidepanel', {
        'visible': isSideBarCollapsed
      }) }
    >
      <div id='sidepanel-render' />
    </div>
  )
}

export default SidePanel
