import React from 'react'
import PropTypes from 'prop-types'
import { ModuleTemplate } from 'components'

const { Layout } = ModuleTemplate

const EmployeeContainer = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

EmployeeContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default EmployeeContainer
