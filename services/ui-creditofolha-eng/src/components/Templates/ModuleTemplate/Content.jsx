import React, { useRef, useLayoutEffect, useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import { SideBarContext } from './SideBar'

const Content = ({ children }) => {
  const startPos = useRef()
  const { toggleSideBar } = useContext(SideBarContext)

  const onTouchEnd = (event) => {
    window.removeEventListener('touchend', onTouchEnd);
    const { clientX } = event.changedTouches[0];
    if (startPos.current > clientX) {
      toggleSideBar(false)
    } else {
      toggleSideBar(true)
    }
    startPos.current = 0
  }

  const onTouchStart = (event) => {
    const { clientX } = event.targetTouches[0];
    startPos.current = clientX
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
        className='sidebar-overlay'
        onClick={ () => toggleSideBar(false) }
      />
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content
