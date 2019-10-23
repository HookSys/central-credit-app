import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const AdminContainer = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

AdminContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminContainer
