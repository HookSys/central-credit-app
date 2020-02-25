import React, { Fragment, useRef, useEffect } from 'react'
import moment from 'moment'
import { Container } from 'templates/PageTemplate'
import Alert from 'components/Alert'

const RepassDiscountEmpty = () => {
  const alertRef = useRef()
  const date = moment()

  useEffect(() => {
    alertRef.current.show()
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
}

export default React.memo(RepassDiscountEmpty)
