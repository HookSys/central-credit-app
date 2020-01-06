import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableRow, TableCell } from 'components/Table'

const TedPayment = ({ payment }) => {
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

TedPayment.propTypes = {
  payment: PropTypes.object.isRequired,
}

export default TedPayment
