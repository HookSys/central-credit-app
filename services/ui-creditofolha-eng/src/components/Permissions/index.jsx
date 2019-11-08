import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getFirstViolatedPermission } from 'helpers'
import { useEngine } from 'engine'

const Permissions = ({ children, permissions: validations }) => {
  const permissions = useEngine(({ permissions: p }) => p)
  useEffect(() => {
    if (permissions) {
      const hasError = getFirstViolatedPermission(validations, permissions)
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
