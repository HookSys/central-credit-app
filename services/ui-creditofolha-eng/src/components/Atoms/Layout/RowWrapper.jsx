import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const RowWrapper = ({ children, className }) => {
  return (
    <div className={ classNames('row', className) }>
      { children }
    </div>
  )
}

RowWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

RowWrapper.defaultProps = {
  className: '',
}

export default RowWrapper
