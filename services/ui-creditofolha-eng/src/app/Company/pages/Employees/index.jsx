import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

import EmployeesSidePanel from './SidePanel'
import EmployeesSearchForm from './SearchForm'

const Employees = ({ entity: { pages }, parent, children }) => {
  return (
    <Layout>
      { children }
      <EmployeesSidePanel pages={ pages.EMPLOYEES } routes={ parent.routes } />
      <EmployeesSearchForm />
    </Layout>
  )
}

Employees.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default Employees
