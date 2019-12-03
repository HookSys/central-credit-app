import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Card = ({ children, className, size }) => {
  return (
    <div className={ size }>
      <div className={ classNames('card mb-4', className) }>
        { children }
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
}

Card.defaultProps = {
  className: '',
  size: 'col-12 col-lg-6 col-xl-4 col-2xl-3',
}

export default Card
