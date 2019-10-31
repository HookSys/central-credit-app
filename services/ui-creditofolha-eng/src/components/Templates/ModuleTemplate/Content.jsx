import React, { useRef, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { SideNavigationContext } from './SideNavigation'

const Content = ({ children }) => {
  const startPos = useRef()
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)

  const onTouchEnd = (event) => {
    window.removeEventListener('touchend', onTouchEnd);
    const { clientX, clientY } = event.changedTouches[0];
    const { clientX: startClientX, clientY: startClientY } = startPos.current

    if (Math.abs(clientY-startClientY) < 20 && startClientX !== clientX) {
      event.preventDefault()
      event.stopPropagation()
      if (startClientX > clientX) {
        toggleSideNavigation(false)
      } else {
        toggleSideNavigation(true)
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
    window.addEventListener('touchstart', onTouchStart);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
    }
  }, [])

  return (
    <div className='d-flex flex-column content'>
      { children }
      <div
        className={ classNames('sidebar-overlay', {
          'active': isSideNavigationVisible,
        }) }
        onClick={ () => toggleSideNavigation(false) }
      />
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content
