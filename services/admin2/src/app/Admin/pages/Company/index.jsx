import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Companies = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Companies.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Companies)
