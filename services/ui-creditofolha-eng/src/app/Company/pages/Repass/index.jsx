import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'
import RepassSidePanel from 'company/pages/Repass/SidePanel'
import { paymentLotsResetSelected } from 'company/actions/paymentLots'
import { useDispatch, useSelector } from 'react-redux'

const Repass = ({ children, parent: { routes }, entity: { pages } }) => {
  const dispatch = useDispatch()
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))

  const onSidePanelChange = useCallback(() => () => {
    if (paymentLot) {
      dispatch(paymentLotsResetSelected())
    }
  }, [paymentLot])

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
