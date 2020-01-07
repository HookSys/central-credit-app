import React, { Fragment, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'
import RepassSidePanel from 'company/pages/Repass/SidePanel'
import { paymentLotsResetSelected } from 'company/actions/paymentLots'
import { useDispatch } from 'react-redux'

const Repass = ({ children, parent: { routes }, entity: { pages } }) => {
  const lastRoute = useRef()
  const dispatch = useDispatch()

  const onSidePanelChange = useCallback((route) => () => {
    if (lastRoute.current !== route) {
      lastRoute.current = route
      dispatch(paymentLotsResetSelected())
    }
  }, [lastRoute])

  return (
    <Fragment>
      <RepassSidePanel
        pages={ pages.REPASS }
        routes={ routes }
        onChange={ onSidePanelChange }
      />
      <Layout>
        { children }
      </Layout>
    </Fragment>
  )
}

Repass.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default React.memo(Repass)
