import React, { Fragment, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Container } from 'templates/PageTemplate'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { repassDiscountLotQuery } from 'company/queries/paymentLots'
import { paymentLotOpenAsyncRequest } from 'company/actions/paymentLots'
import Alert from 'components/Alert'

const RepassDiscountEmpty = ({ entity: { pages } }) => {
  const alertRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const date = moment()
  const currentMonth = date.format('YYYYMM')

  useEffect(() => {
    alertRef.current.show()
    dispatch(paymentLotOpenAsyncRequest(repassDiscountLotQuery, currentMonth))
      .then((response) => {
        if (response) {
          history.push(pages.REPASS.INDEX.INFOS)
        }
      })
  }, [])

  return (
    <Fragment>
      <div className='row my-4'>
        <div className='col-12'>
          <Alert ref={ alertRef } hideClose={ true } className='alert no-absolute warning w-100 py-2 shadow'>
            <strong>Lote vazio!</strong>  Não há contratos a serem descontados.
          </Alert>
        </div>
      </div>
      <Container isWhiteBackground={ true }>
        <h5 className='text-uppercase'>{ date.format('MMMM YYYY') }</h5>
        <div className='bg-light border border-low-dark mt-4 border-dotted'>
          <div className='d-flex flex-column px-1 px-md-5 mx-1 mx-md-5 py-5'>
            <div className='d-flex align-items-center justify-content-center'>
              Aguarde o fechamento do próximo mês.
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

RepassDiscountEmpty.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default React.memo(RepassDiscountEmpty)
