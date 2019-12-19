import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRightSwipe, useLeftSwipe } from 'hooks'

import { SideNavigationContext } from './SideNavigation'
import { ActionBarContext } from './ActionBar'

const Content = ({ children }) => {
  const contentRef = useRef()
  const { isActionBarVisible } = useContext(ActionBarContext)
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)

  useRightSwipe(() => {
    toggleSideNavigation(true)
  }, contentRef)

  useLeftSwipe(() => {
    toggleSideNavigation(false)
  }, contentRef)

  return (
    <div
      className={ classNames('d-flex flex-column content', {
        'mb-5': isActionBarVisible && !isSideNavigationVisible,
      }) }
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
