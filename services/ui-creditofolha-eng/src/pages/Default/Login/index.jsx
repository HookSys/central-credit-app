import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import { CleanTemplate, SvgImage, ReduxFormInput } from 'components'
import withEngine from 'engine/withEngine'
import { authRequest } from 'actions/auth'

import ReduxFormInputBuilder from 'components/Molecules/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/Molecules/ReduxFormInput/builders/InputAddonBuilder'
import { RemoveRedEyeOutlined } from '@material-ui/icons'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Logo, Container, Content, Title } = CleanTemplate

const Login = ({ handleSubmit, appForm, structure: { ROUTES } }) => {
  const dispatch = useDispatch()
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState(false)

  const onSubmit = (values) => {
    dispatch(authRequest(values.get('email'), values.get('password')))
  }

  const ReduxFormInputWithAddon = useMemo(() => {
    const InputAddon = InputAddonBuilder()
      .rightPosition()
      .renderMethod(() => (
        <div className='icon-right-addon'>
          <RemoveRedEyeOutlined />
        </div>
      )).build()
    return ReduxFormInputBuilder().rightAddon(InputAddon).build()
  }, [])


  const { validators: { required } } = appForm
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
            />
            <Field
              type={ isPasswordEyeActive ? 'text' : 'password' }
              placeholder='Senha'
              name='password'
              id='password'
              component={ ReduxFormInputWithAddon }
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
                  to={ ROUTES.REGISTRATION.URL }
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

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  appForm: PropTypes.object.isRequired,
  structure: PropTypes.object.isRequired,
}

export default reduxForm({
  form: 'loginForm',
})(withEngine(Login))
