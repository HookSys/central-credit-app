import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'
import { useActiveRoute } from 'hooks'
import ContractsSidePanel from './SidePanel'

const Contracts = ({ entity: { pages }, route, children }) => {
  const activeRoute = useActiveRoute()
  return (
    <Layout>
      { activeRoute.page !== pages.CONTRACTS.APPROVED.VIEW && (
        <ContractsSidePanel pages={ pages.CONTRACTS } routes={ route.routes } />
      ) }
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
