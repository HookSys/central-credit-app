import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Alert from 'components/Alert'
import Layout from 'templates/PageTemplate'
import Button from 'components/Button'
import SvgImage from 'components/SvgImage'

const { AVAILABLE_IMAGES } = SvgImage

const NoContractsDashboard = ({ entity: { pages } }) => {
  const alertRef = useRef()
  const history = useHistory()

  useEffect(() => {
    alertRef.current.show()
  }, [])

  return (
    <Layout>
      <div className='row mt-4'>
        <div className='col-8 offset-2'>
          <div className='row'>
            <div className='col-12'>
              <Alert ref={ alertRef } hideClose={ true } className='alert no-absolute warning w-100 py-2 shadow'>
                Você ainda não fez nenhuma <strong>solicitação de crédito</strong>.
              </Alert>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12'>
              <div className='d-flex align-items-center justify-space-between bg-white shadow p-5'>
                <div>
                  <span className='d-block mb-4 font-size-3xl'>Crédito consignado sem buroracria!</span>
                  <Button onClick={ () => history.push(pages.CREDIT) }>Simular Crédito</Button>
                </div>
                <SvgImage icon={ AVAILABLE_IMAGES.BANNER_DASHBOARD_CREDIT } />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

NoContractsDashboard.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default NoContractsDashboard
