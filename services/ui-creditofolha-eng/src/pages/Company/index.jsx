import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const CompanyContainer = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

CompanyContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CompanyContainer
