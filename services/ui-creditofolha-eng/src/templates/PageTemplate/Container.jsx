import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, isWhiteBackground }) => {
  return (
    <div className={ classNames('w-100', className, {
      'bg-light': !isWhiteBackground,
      'bg-white': isWhiteBackground,
    }) }
    >
      { children }
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isWhiteBackground: PropTypes.bool,
}

Container.defaultProps = {
  className: 'p-4',
  isWhiteBackground: false,
}

export default Container
