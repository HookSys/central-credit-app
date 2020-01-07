import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paymentLotOpenAsyncRequest } from 'company/actions/paymentLots'
import { repassDiscountLotQuery } from 'company/queries/paymentLots'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PAYMENT_LOT_STATUS } from 'constants/paymentLot'

const RepassDiscount = ({ children, entity: { pages } }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(paymentLotOpenAsyncRequest(repassDiscountLotQuery))
      .then((paymentLot) => {
        if (!paymentLot) {
          history.push(pages.REPASS.INDEX.EMPTY)
          return
        }

        if (paymentLot.get('status').includes(PAYMENT_LOT_STATUS.PENDING)) {
          history.push(pages.REPASS.INDEX.INDEX)
          return
        }

        history.push(pages.REPASS.INDEX.INFOS)
      })
  }, [])

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

RepassDiscount.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
}

export default React.memo(RepassDiscount)
