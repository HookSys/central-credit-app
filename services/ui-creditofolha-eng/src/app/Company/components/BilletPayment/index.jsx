import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableRow, TableCell } from 'components/Table'
import { PAYMENT_DESCRIPTION } from 'constants/paymentLot'

const BilletPayment = ({ payment, onCopyToClipboard }) => {
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

BilletPayment.propTypes = {
  payment: PropTypes.object.isRequired,
  onCopyToClipboard: PropTypes.func.isRequired,
}

export default BilletPayment
