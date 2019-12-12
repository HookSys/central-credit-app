import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Employees = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Employees.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Employees
