import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRightSwipe, useLeftSwipe } from 'engine'

import { SideNavigationContext } from './SideNavigation'

const Content = ({ children }) => {
  const contentRef = useRef()
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)

  useRightSwipe(() => {
    toggleSideNavigation(true)
  }, contentRef)

  useLeftSwipe(() => {
    toggleSideNavigation(false)
  }, contentRef)

  return (
    <div
      className='d-flex flex-column content'
      ref={ contentRef }
    >
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
