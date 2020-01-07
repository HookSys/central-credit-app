import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import Button from 'components/Button'
import FeedbackTemplate from 'templates/FeedbackTemplate'
import SvgImage from 'components/SvgImage'
import { PAYMENT_TYPES } from 'constants/paymentLot'
import { TableDefault, TableHead, TableHeader } from 'components/Table'
import { ToastContext } from 'components/ToastProvider'
import BilletPayment from 'company/components/BilletPayment'
import TedPayment from 'company/components/TedPayment'

const { Layout, Header, Content } = FeedbackTemplate
const { AVAILABLE_IMAGES } = SvgImage

const EmployeesDemissionSuccess = ({ entity: { pages } }) => {
  const { showSuccessToast } = useContext(ToastContext)
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))
  const history = useHistory()

  if (!paymentLot) {
    return (
      <Redirect to={ pages.REPASS.INDEX.INDEX } />
    )
  }

  const onCopyToClipboard = useCallback(() => {
    showSuccessToast({
      message: 'Copiado!',
    })
  }, [showSuccessToast])

  const onDetail = () => history.push(pages.REPASS.DETAIL.INDEX)
  const payments = paymentLot.get('pagamento')
  return (
    <Layout>
      <Header
        desktopIconName={ AVAILABLE_IMAGES.SUCCESS_DESKTOP_ICON }
        mobileIconName={ AVAILABLE_IMAGES.SUCCESS_MOBILE_ICON }
      >
        Lote enviado com sucesso!
      </Header>
      <Content>
        <p className='d-block text-uppercase font-weight-bold font-size-xl px-3 px-md-0'>
          { paymentLot.getFormatedReferenceMonth('MMMM YYYY') }
        </p>
        <div className='my-5 px-3 px-md-0'>
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
                    <BilletPayment payment={ payment } onCopyToClipboard={ onCopyToClipboard } />
                  ) }

                  { paymentType === PAYMENT_TYPES.TED && (
                    <TedPayment payment={ payment } />
                  ) }
                </TableDefault>
              </div>
            )
          }) }
        </div>
        <Button className='btn btn-default border-gray mt-2 d-block mx-auto mx-md-0' onClick={ onDetail }>
          Página detalhamento
        </Button>
      </Content>
    </Layout>
  )
}

EmployeesDemissionSuccess.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default EmployeesDemissionSuccess
