import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Repass = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Repass.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(Repass)
