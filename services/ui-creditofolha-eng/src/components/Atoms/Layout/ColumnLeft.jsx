import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ColumnLeft = React.forwardRef(({ children, className }, ref) => {
  return (
    <div
      ref={ ref }
      className={ classNames('mr-auto', className) }
    >
      { children }
    </div>
  )
})

ColumnLeft.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

ColumnLeft.defaultProps = {
  className: '',
}

export default ColumnLeft
