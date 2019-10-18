import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const EmployeeContainer = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

EmployeeContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default EmployeeContainer
