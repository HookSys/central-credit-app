import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const DefaultContainer = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

DefaultContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultContainer
