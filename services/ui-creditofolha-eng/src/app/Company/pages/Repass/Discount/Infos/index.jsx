import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useHistory, Redirect } from 'react-router-dom'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { PAYMENT_TYPES, PAYMENT_LOT_STATUS } from 'constants/paymentLot'
import { ToastContext } from 'components/ToastProvider'
import { TableDefault, TableHead, TableHeader } from 'components/Table'
import { repassDiscountLotQuery } from 'company/queries/paymentLots'
import { paymentLotOpenAsyncRequest } from 'company/actions/paymentLots'
import BilletPayment from 'company/components/BilletPayment'
import TedPayment from 'company/components/TedPayment'

const RepassDiscountInfos = ({ entity: { pages } }) => {
  const date = moment()
  const history = useHistory()
  const dispatch = useDispatch()
  const { showSuccessToast } = useContext(ToastContext)
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))
  const currentMonth = date.format('YYYYMM')

  useEffect(() => {
    dispatch(paymentLotOpenAsyncRequest(repassDiscountLotQuery, currentMonth))
      .then((response) => {
        if (!response) {
          history.push(pages.REPASS.INDEX.EMPTY)
        }
      })
  }, [])

  const onCopyToClipboard = useCallback(() => {
    showSuccessToast({
      message: 'Copiado!',
    })
  }, [showSuccessToast])

  if (!paymentLot) {
    return null
  }

  if (paymentLot.get('status').includes(PAYMENT_LOT_STATUS.PENDING)) {
    return (
      <Redirect to={ pages.REPASS.INDEX.INDEX } />
    )
  }

  const payments = paymentLot.get('pagamento')
  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Desconto em folha</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <h5 className='text-uppercase'>{ date.format('MMMM YYYY') }</h5>
        <div className='bg-light border border-low-dark mt-4 border-dotted'>
          <div className='d-flex align-items-center justify-content-center w-100'>
            <div className='my-5 w-100 w-md-50 px-3 px-md-0'>
              { payments.map((payment, i) => {
                const paymentType = payment.get('forma_de_pagamento')
                return (
                  <div
                    key={ `${ paymentType }-${ i + 1 }` }
                    className={ classNames('d-flex flex-column', {
                      'mt-3': i > 0,
                    }) }
                  >
                    <p className='h5 mb-3'>{ payment.getIn(['financeira', 'nome_fantasia']) }</p>
                    <TableDefault>
                      <TableHead>
                        <TableHeader className='border-top-0 font-weight-lighter pb-1'>
                          Valor
                        </TableHeader>
                        <TableHeader className='border-top-0 font-weight-lighter pb-1'>
                          Forma de pagamento
                        </TableHeader>
                      </TableHead>
                      { paymentType === PAYMENT_TYPES.BILLET && (
                        <BilletPayment
                          payment={ payment }
                          onCopyToClipboard={ onCopyToClipboard }
                        />
                      ) }

                      { paymentType === PAYMENT_TYPES.TED && (
                        <TedPayment payment={ payment } />
                      ) }
                    </TableDefault>
                  </div>
                )
              }) }
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

RepassDiscountInfos.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default React.memo(RepassDiscountInfos)
