import React from 'react'
import PropTypes from 'prop-types'
import { useWindowSize } from 'hooks'

import EmployeeMobileFieldArray from './Mobile'
import EmployeeDesktopFieldArray from './Desktop'

const EmployeeFieldArray = ({ fields, discounts, errors }) => {
  const size = useWindowSize()

  if (['XS', 'SM'].includes(size)) {
    return (
      <EmployeeMobileFieldArray fields={ fields } discounts={ discounts } errors={ errors } />
    )
  }

  return (
    <EmployeeDesktopFieldArray fields={ fields } discounts={ discounts } errors={ errors } />
  )
}

EmployeeFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  discounts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

export default EmployeeFieldArray
