import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useEngine } from 'engine'

const Permissions = ({ children, permissions }) => {
  const getFirstViolatedPermission = useEngine(({ helpers }) => helpers.getFirstViolatedPermission)
  useEffect(() => {
    if (permissions) {
      const hasError = getFirstViolatedPermission(permissions)
      if (hasError) {
        hasError()
      }
    }
  }, [permissions])

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

Permissions.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.array,
}

Permissions.defaultProps = {
  permissions: [],
}

export default Permissions
