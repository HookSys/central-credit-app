import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import { CleanTemplate, SvgImage, ReduxFormInput } from 'components'
import withEngine from 'engine/withEngine'
import { authRequest } from 'actions/auth'

const { AVAILABLE_IMAGES } = SvgImage

const Login = ({ handleSubmit, appForm }) => {
  const dispatch = useDispatch()
  const onSubmit = (values) => {
    dispatch(authRequest(values.get('email'), values.get('password')))
  }
  const { validators: { required } } = appForm
  return (
    <CleanTemplate className='login'>
      <CleanTemplate.CenterContent>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <SvgImage icon={ AVAILABLE_IMAGES.LOGO_FULL } maxWidth='250px' maxHeight='47px' />
        </div>
        <h5 className='text-center font-weight-normal mt-3 mb-4 pb-3'>
          Login do sistema
        </h5>
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
            type='password'
            placeholder='Senha'
            name='password'
            id='password'
            component={ ReduxFormInput }
            className='form-control-lg'
            validate={ required }
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
              <Link to='/' className='btn btn-link btn-lg w-100 w-md-auto px-0 font-weight-bold text-center text-md-left'>Criar Conta</Link>
            </div>
            <div className='col-12 col-md-6 ml-auto text-right'>
              <button className='btn btn-success btn-lg px-4 w-100 w-md-auto' type='submit'>Acessar</button>
            </div>
          </div>
        </form>
      </CleanTemplate.CenterContent>
    </CleanTemplate>
  )
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  appForm: PropTypes.object.isRequired,
}

export default reduxForm({
  form: 'loginForm',
})(withEngine(Login))
