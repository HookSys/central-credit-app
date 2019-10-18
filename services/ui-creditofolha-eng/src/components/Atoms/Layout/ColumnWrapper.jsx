import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ColumnWrapper = React.forwardRef(({ children, className }, ref) => {
  return (
    <div
      ref={ ref }
      className={ classNames('d-flex align-items-center px-2 px-lg-3 py-sticky-0', {
        'py-4 ': !className,
      }, className) }
    >
      { children }
    </div>
  )
})

ColumnWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

ColumnWrapper.defaultProps = {
  className: '',
}

export default ColumnWrapper
