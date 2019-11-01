import React, { useContext, useRef, useLayoutEffect } from 'react'
import classNames from 'classnames'

import { SideBarContext } from './SideBar'
import { SideNavigationContext } from './SideNavigation'

const SidePanel = () => {
  const sidepanelRef = useRef()
  const startPos = useRef()
  const { isSideBarCollapsed, toggleSideBar } = useContext(SideBarContext)
  const { toggleSideNavigation } = useContext(SideNavigationContext)

  const onTouchEnd = (event) => {
    window.removeEventListener('touchend', onTouchEnd);
    const { clientX, clientY } = event.changedTouches[0];
    const { clientX: startClientX, clientY: startClientY } = startPos.current

    if (Math.abs(clientY-startClientY) < 20 && startClientX !== clientX) {
      event.preventDefault()
      event.stopPropagation()
      if (startClientX <= clientX) {
        toggleSideBar(false)
      } else {
        toggleSideNavigation(false)
      }

      startPos.current = 0
    }
  }

  const onTouchStart = (event) => {
    const { clientX, clientY } = event.targetTouches[0];
    startPos.current = {
      clientX,
      clientY,
    }
    window.addEventListener('touchend', onTouchEnd);
  }

  useLayoutEffect(() => {
    sidepanelRef.current.addEventListener('touchstart', onTouchStart);
    return () => {
      sidepanelRef.current.removeEventListener('touchstart', onTouchStart);
    }
  }, [])

  return (
    <div
      ref={ sidepanelRef }
      className={ classNames('sidepanel', {
        'visible': isSideBarCollapsed
      }) }
    >
      <div id='sidepanel-render' />
    </div>
  )
}

export default SidePanel
