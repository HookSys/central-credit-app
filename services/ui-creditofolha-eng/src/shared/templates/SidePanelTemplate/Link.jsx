import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isRouteSidePanelActive } from 'helpers'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useActiveRoute } from 'hooks'

const Link = ({ children, pages, routeKey, onClick }) => {
  const location = useLocation()
  const route = useActiveRoute()

  const isContainer = typeof pages[routeKey] === 'object'
  const to = isContainer ? pages[routeKey].INDEX : pages[routeKey]
  return (
    <RouterLink
      to={ to }
      onClick={ onClick }
      className={ classNames('pl-3', {
        'active': isRouteSidePanelActive(location, to, routeKey, route),
      }) }
    >
      { children }
    </RouterLink>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  pages: PropTypes.object.isRequired,
  routeKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Link.defaultProps = {
  onClick: () => {},
}

export default React.memo(Link)
