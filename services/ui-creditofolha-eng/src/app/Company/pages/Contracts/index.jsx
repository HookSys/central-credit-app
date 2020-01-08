import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

import ContractsSidePanel from './SidePanel'

const Contracts = ({ entity: { pages }, route, children }) => {
  return (
    <Layout>
      <ContractsSidePanel pages={ pages.CONTRACTS } routes={ route.routes } />
      { children }
    </Layout>
  )
}

Contracts.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default React.memo(Contracts)
