import React, { Fragment, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { PAYMENT_TYPES } from 'constants/paymentLot'
import { ToastContext } from 'components/ToastProvider'
import { TableDefault, TableHead, TableHeader } from 'components/Table'
import BilletPayment from 'company/components/BilletPayment'
import TedPayment from 'company/components/TedPayment'

const RepassDiscountInfos = () => {
  const { showSuccessToast } = useContext(ToastContext)
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))

  const onCopyToClipboard = useCallback(() => {
    showSuccessToast({
      message: 'Copiado!',
    })
  }, [showSuccessToast])

  if (!paymentLot) {
    return null
  }

  const date = paymentLot.getReferenceMonth()
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
}

export default React.memo(RepassDiscountInfos)
