import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isRouteActive } from 'helpers'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Link = ({ children, pages, routeKey, onClick }) => {
  const location = useLocation()

  const isContainer = typeof pages[routeKey] === 'object'
  const to = isContainer ? pages[routeKey].INDEX : pages[routeKey]
  return (
    <RouterLink
      to={ to }
      onClick={ onClick }
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
  pages: PropTypes.object.isRequired,
  routeKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Link.defaultProps = {
  onClick: () => {},
}

export default Link
