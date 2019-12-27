import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import Button from 'components/Button'
import FeedbackTemplate from 'templates/FeedbackTemplate'
import SvgImage from 'components/SvgImage'
import { PAYMENT_TYPES, PAYMENT_DESCRIPTION } from 'constants/paymentLot'
import { TableDefault, TableHead, TableHeader, TableBody, TableRow, TableCell } from 'components/Table'
import { ToastContext } from 'components/ToastProvider'

const { Layout, Header, Content } = FeedbackTemplate
const { AVAILABLE_IMAGES } = SvgImage

function tedPayment(payment) {
  const paymentData = payment.get('dados_pagamento')
  return (
    <TableBody>
      <TableRow>
        <TableCell className='align-top'>
          <span className='font-weight-bold'>{ payment.getFormatedCurrency('total_a_ser_pago') }</span>
        </TableCell>
        <TableCell className='align-top'>
          <span className='font-weight-bold'>{`${ payment.get('forma_de_pagamento') } - ${ paymentData.get('banco_nome') }`}</span>
          <span>
            { ` Ag ${ paymentData.get('agencia') } ${ paymentData.get('agencia_dac') } 
              / CC ${ paymentData.get('conta') }-${ paymentData.get('conta_dac') }
              / ${ payment.getIn(['financeira', 'cnpj']) }
            ` }
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

function billetPayment(payment, onCopyToClipboard) {
  const paymentData = payment.get('dados_pagamento')

  return (
    <TableBody>
      { paymentData.size > 0 && paymentData.map((billet) => {
        const urlImage = billet.get('url_img') || '#'
        const copyToClipboard = () => {
          navigator.clipboard.writeText(billet.get('codigo_barras'))
          onCopyToClipboard()
        }

        return (
          <TableRow key={ billet.get('identificador') }>
            <TableCell className='align-top'>
              <span className='font-weight-bold'>{ billet.getFormatedCurrency('valor') }</span>
            </TableCell>
            <TableCell>
              <div className='d-flex justify-content-md-between align-items-start align-items-md-center flex-column flex-md-row'>
                <div className='d-flex flex-column'>
                  <span className='font-weight-bold'>{ PAYMENT_DESCRIPTION[payment.get('forma_de_pagamento')] }</span>
                  <button type='button' className='btn btn-link p-0 text-left' onClick={ copyToClipboard }>
                    Copiar código
                  </button>
                </div>
                <a href={ urlImage } className='btn btn-primary btn-sm' target='_blank' rel='noopener noreferrer'>Download</a>
              </div>
            </TableCell>
          </TableRow>
        )
      }) }
    </TableBody>
  )
}

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

  const onDetail = () => history.push(pages.REPASS.DETAIL)
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
                  { paymentType === PAYMENT_TYPES.BILLET
                    && billetPayment(payment, onCopyToClipboard) }

                  { paymentType === PAYMENT_TYPES.TED
                    && tedPayment(payment) }
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
