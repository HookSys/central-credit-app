import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const RepassDetai = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

RepassDetai.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(RepassDetai)
