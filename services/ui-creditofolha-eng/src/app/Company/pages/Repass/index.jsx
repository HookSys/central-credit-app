import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'
import { useActiveRoute } from 'hooks'
import RepassSidePanel from './SidePanel'

const Repass = ({ children, entity: { pages }, route: { routes } }) => {
  const activeRoute = useActiveRoute()
  return (
    <Layout>
      { activeRoute.page !== pages.REPASS.DETAIL.VIEW && (
        <RepassSidePanel
          pages={ pages.REPASS }
          routes={ routes }
        />
      ) }
      { children }
    </Layout>
  )
}

Repass.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default React.memo(Repass)
