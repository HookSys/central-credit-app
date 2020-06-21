import React from 'react'
import PropTypes from 'prop-types'
import ModuleTemplate from 'templates/ModuleTemplate'

const { Layout } = ModuleTemplate

const UserContainer = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

UserContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(UserContainer)
