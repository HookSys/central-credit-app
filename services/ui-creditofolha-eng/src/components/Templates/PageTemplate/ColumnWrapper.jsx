import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ColumnWrapper = ({ children, className }) => {
  return (
    <div className={ classNames('d-flex py-sticky-0', className) }>
      { children }
    </div>
  )
}

ColumnWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

ColumnWrapper.defaultProps = {
  className: 'py-4',
}

export default ColumnWrapper
