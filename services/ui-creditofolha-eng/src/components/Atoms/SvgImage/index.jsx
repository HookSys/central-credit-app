import React from 'react'
import PropTypes from 'prop-types'

import EmployeeLogo from 'assets/svg/employee-logo.svg'
import EmployeeIcon from 'assets/svg/employee-icon.svg'

const SvgShape = PropTypes.shape({
  id: PropTypes.string,
  viewBox: PropTypes.string,
  url: PropTypes.string,
  toString: PropTypes.func,
})

export const AVAILABLE_IMAGES = {
  EMPLOYEE_LOGO: EmployeeLogo,
  EMPLOYEE_ICON: EmployeeIcon,
}

const SvgImage = ((props) => {
  const { icon, className } = props
  return (
    <svg
      width={ icon.width }
      height={ icon.height }
      viewBox={ icon.viewBox }
      className={ className }
    >
      <use xlinkHref={ icon.url } />
    </svg>
  )
})

SvgImage.propTypes = {
  icon: SvgShape.isRequired,
  className: PropTypes.string,
}
SvgImage.defaultProps = {
  className: '',
}

export default SvgImage
