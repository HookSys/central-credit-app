import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FormContentElement = ({ children, sm, lg }) => {
  return (
    <div
      className={ classNames({
        [`col-md-${ lg }`]: lg !== '',
        [`col-${ sm }`]: sm !== '',
      }) }
    >
      { children }
    </div>
  )
}

FormContentElement.propTypes = {
  children: PropTypes.node.isRequired,
  lg: PropTypes.string,
  sm: PropTypes.string,
}

FormContentElement.defaultProps = {
  sm: '12',
  lg: '',
}

export default FormContentElement
