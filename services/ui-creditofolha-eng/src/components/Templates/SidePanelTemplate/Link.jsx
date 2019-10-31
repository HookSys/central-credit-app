import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useEngine } from 'engine'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Link = ({ children, to, routeKey }) => {
  const location = useLocation()
  const { isRouteActive } = useEngine(engine => engine.helpers)

  return (
    <RouterLink
      to={ to }
      className={ classNames('pl-3', {
        'active': isRouteActive(location, to, routeKey),
      }) }
    >
      { children }
    </RouterLink>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  routeKey: PropTypes.string.isRequired,
}

export default Link
