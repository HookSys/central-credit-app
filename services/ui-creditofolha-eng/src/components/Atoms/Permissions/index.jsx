import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import withEngine from 'engine/withEngine'

const Permissions = ({ children, permissions, appHelpers }) => {
  useEffect(() => {
    if (permissions) {
      const hasError = appHelpers.getFirstViolatedPermission(permissions)
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
  appHelpers: PropTypes.object.isRequired,
  permissions: PropTypes.array,
}

Permissions.defaultProps = {
  permissions: [],
}

export default withEngine(Permissions)
