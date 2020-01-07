import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const RepassDiscount = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

RepassDiscount.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(RepassDiscount)
