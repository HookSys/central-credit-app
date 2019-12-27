import React from 'react'
import PropTypes from 'prop-types'

const CheckboxFormatter = ({ value }) => {
  return (
    <div className='form-check d-block w-100 text-center'>
      <input
        type='checkbox'
        checked={ value === true }
        onChange={ () => {} }
        className='form-check-input position-static'
      />
    </div>
  )
}

CheckboxFormatter.propTypes = {
  value: PropTypes.any,
}

CheckboxFormatter.defaultProps = {
  value: 0,
}

export default CheckboxFormatter
