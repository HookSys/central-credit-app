// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import SvgImage from 'components/SvgImage'
import ReduxFormInput from 'components/ReduxFormInput'
import { CleanTemplate } from 'templates'
import { authRequest } from 'core/actions/auth'
import { required } from 'form/validators'

import type { TDefaultPageProps } from 'default/types'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Logo, Container, Content, Title } = CleanTemplate

type TPageProps = {
  ...TDefaultPageProps,
  handleSubmit: Function,
}

const Login = (
  { handleSubmit, parent: { routes } }: TPageProps
) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState(false)
  const onSubmit = async (values) => {
    const response = await dispatch(authRequest(values.get('email'), values.get('password')))
    if (response) {
      setTimeout(() => history.push(routes.PROFILES.route))
    }
  }

  return (
    <Layout className='login'>
      <Container>
        <Content className='py-5 px-2 px-md-3'>
          <Logo className='mt-2 mb-4'>
            <SvgImage icon={ AVAILABLE_IMAGES.LOGO_FULL } maxWidth='250px' maxHeight='47px' />
          </Logo>
          <Title>
            Login do sistema
          </Title>
          <form onSubmit={ handleSubmit(onSubmit) }>
            <Field
              type='text'
              placeholder='E-mail'
              name='email'
              id='email'
              component={ ReduxFormInput }
              className='form-control-lg'
              validate={ required }
              inputMode='email'
              hideError={ true }
              isDetailError={ true }
            />
            <Field
              type={ isPasswordEyeActive ? 'text' : 'password' }
              placeholder='Senha'
              name='password'
              id='password'
              component={ ReduxFormInput }
              className='form-control-lg'
              validate={ required }
              onRightAddonClick={ () => togglePasswordEyeActive(!isPasswordEyeActive) }
            />
            <div className='row justify-content-space-between mt-n2 mb-4 pb-3'>
              <div className='col-12 text-right'>
                <Link to='/' className='text-secondary font-weight-regular font-size-md'>
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className='row justify-content-space-between flex-column-reverse flex-md-row mt-md-4'>
              <div className='col-12 col-md-6 mt-4 mt-md-auto'>
                <Link
                  to={ routes.REGISTRATION.route }
                  className='btn btn-link btn-lg w-100 w-md-auto px-0 font-weight-bold text-center text-md-left text-primary'
                >
                  Cadastre-se
                </Link>
              </div>
              <div className='col-12 col-md-6 ml-auto text-right'>
                <button className='btn btn-primary btn-lg px-4 w-100 w-md-auto' type='submit'>Acessar</button>
              </div>
            </div>
          </form>
        </Content>
      </Container>
    </Layout>
  )
}

export default reduxForm({
  form: 'loginForm',
})(Login)
