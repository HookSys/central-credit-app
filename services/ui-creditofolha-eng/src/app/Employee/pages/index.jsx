import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ModuleTemplate from 'templates/ModuleTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { employeeAsyncRequest } from 'employee/actions/employee'

const { Layout } = ModuleTemplate

const EmployeeContainer = ({ children }) => {
  const dispatch = useDispatch()
  const employee = useSelector(state => state.employee.employee.get('data'))

  useEffect(() => {
    dispatch(employeeAsyncRequest())
  }, [])

  if (!employee.get('id')) {
    return null
  }

  return (
    <Layout>
      { children }
    </Layout>
  )
}

EmployeeContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(EmployeeContainer)
