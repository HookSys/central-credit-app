import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import EmployeesSidePanel from 'company/pages/Employees/SidePanel'
import { employeesUpdateFilters } from 'company/actions/employees'

const EmployeesDemission = ({ children, parent: { parent }, entity: { pages } }) => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(employeesUpdateFilters(''))
  }, [])

  return (
    <Fragment>
      <EmployeesSidePanel
        pages={ pages.EMPLOYEES }
        routes={ parent.routes }
        onChange={ onChange }
      />
      { children }
    </Fragment>
  )
}

EmployeesDemission.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default EmployeesDemission
