import React from 'react'
import PropTypes from 'prop-types'

const PaymentLotDetailCard = ({ paymentLot }) => {
  const contracts = paymentLot.get('descontos_por_funcionario').size

  return (
    <div className='d-flex align-items-center w-100'>
      <div className='d-flex flex-column w-40'>
        <span className='d-block font-size-3xl text-center'>
          { paymentLot.getFormatedReferenceMonth('MMM') }
        </span>
      </div>
      <div className='d-flex flex-column w-60'>
        <span className='d-block font-size-sm text-dark font-weight-lighter text-left'>Repasse Total</span>
        <span className='d-block text-dark font-weight-bold text-left text-truncate mt-n1'>{ paymentLot.getFormatedCurrency('valor_previsto') }</span>
        <span className='d-block text-left text-truncate text-low-dark font-size-sm mt-n1'>{ `${ contracts } contratos` }</span>
      </div>
    </div>
  )
}

PaymentLotDetailCard.propTypes = {
  paymentLot: PropTypes.object.isRequired,
}

export default React.memo(PaymentLotDetailCard)
