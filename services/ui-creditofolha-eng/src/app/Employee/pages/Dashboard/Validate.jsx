import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CheckCircle } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import SvgImage from 'components/SvgImage'
import Button from 'components/Button'
import Layout, { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'

const { AVAILABLE_IMAGES } = SvgImage

const ValidateDashboard = ({ entity: { pages } }) => {
  const history = useHistory()
  const user = useSelector(state => state.user.get('data'))

  const onButtonClick = () => {
    history.push(pages.MY_ACCOUNT.INDEX)
  }

  const isEmailValidated = user.get('email_verificado')
  const isPhoneValidated = user.get('telefone_celular_verificado')

  if (isEmailValidated && isPhoneValidated) {
    return (
      <Redirect to={ pages.INDEX.INDEX } />
    )
  }

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Complete seu cadastro</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center w-100 bg-white shadow-lg px-4 py-3 text-success'>
              <SvgImage icon={ AVAILABLE_IMAGES.USER_DASHBOARD_ICON } className='font-size-3xl mr-3' />
              <span className='d-block font-size-xl font-weight-bold'>Criar usuário e senha</span>
              <CheckCircle className='ml-auto' />
            </div>
            <div
              className={ classNames('d-flex align-items-center w-100 bg-white-op px-4 py-3 mt-2', {
                'text-success shadow-lg': isEmailValidated,
              }) }
            >
              <SvgImage
                icon={ isEmailValidated ? AVAILABLE_IMAGES.EMAIL_DASHBOARD_ICON_GREEN
                  : AVAILABLE_IMAGES.EMAIL_DASHBOARD_ICON }
                className='font-size-3xl mr-3'
              />
              <span
                className={ classNames('d-block font-size-xl', {
                  'font-weight-bold': isEmailValidated,
                }) }
              >
                Validar email
              </span>
              { !isEmailValidated ? (
                <Button className='btn btn-light btn-sm bg-white ml-auto' onClick={ onButtonClick }>Validar</Button>
              ) : (
                <CheckCircle className='ml-auto' />
              )}
            </div>
            <div
              className={ classNames('d-flex align-items-center w-100 bg-white-op px-4 py-3 mt-2', {
                'text-success shadow-lg': isPhoneValidated,
              }) }
            >
              <SvgImage
                icon={ isPhoneValidated ? AVAILABLE_IMAGES.PHONE_DASHBOARD_ICON
                  : AVAILABLE_IMAGES.PHONE_DASHBOARD_ICON }
                className='font-size-3xl mr-3'
              />
              <span
                className={ classNames('d-block font-size-xl', {
                  'font-weight-bold': isPhoneValidated,
                }) }
              >
                Validar telefone
              </span>
              { !isPhoneValidated ? (
                <Button className='btn btn-light btn-sm bg-white ml-auto' onClick={ onButtonClick }>Validar</Button>
              ) : (
                <CheckCircle className='ml-auto' />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

ValidateDashboard.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default ValidateDashboard
