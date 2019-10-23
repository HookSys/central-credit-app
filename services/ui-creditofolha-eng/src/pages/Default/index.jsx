import React, { Fragment } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const DefaultContainer = ({ children, structure }) => {
  const location = useLocation()
  const { ENTRY, ROUTES } = structure
  if (location.pathname === ENTRY) {
    return (
      <Redirect to={ ROUTES.LOGIN.URL } />
    )
  }
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

DefaultContainer.propTypes = {
  children: PropTypes.node.isRequired,
  structure: PropTypes.object.isRequired,
}

export default DefaultContainer
