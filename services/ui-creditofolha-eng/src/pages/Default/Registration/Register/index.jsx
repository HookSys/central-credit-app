import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import zxcvbn from 'zxcvbn'
import { ReduxFormInput, Button, PasswordStrength, PasswordTips } from 'components'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { registerAsyncRequest } from 'actions/register'

import { required, cpfValidator, weakPassword, passwordsMatch } from 'form/validators'
import { cpfNormalizer } from 'form/normalizers'

import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

import { CleanTemplate } from 'templates'

const formName = 'registerForm'
const selector = formValueSelector(formName)
const { Content, HeaderTitle, Footer } = CleanTemplate

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <RemoveRedEyeOutlined />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .build()

const RegisterRegistration = ({ handleSubmit, parent, rootPath, invalid }) => {
  const [scoreDescription, setScoreDescription] = useState([])
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState()

  const password = useSelector(state => selector(state, 'password'))
  useEffect(() => {
    if (!password) {
      setScoreDescription([])
      return
    }
    const { score } = zxcvbn(password.substr(0, 100))
    if (score <= 2) {
      setScoreDescription([30, 'danger', 'Senha Fraca'])
    } else if (score === 3) {
      setScoreDescription([65, 'warning', 'Senha Boa'])
    } else {
      setScoreDescription([100, 'primary', 'Senha Forte'])
    }
  }, [password])

  const { routes: { SUCCESS } } = parent

  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit = async (values) => {
    const response = await dispatch(registerAsyncRequest(values.get('cpf'), values.get('email'), values.get('password')))
    if (response) {
      history.push(`${ rootPath }${ SUCCESS.route }`)
    }
  }

  return (
    <Content>
      <HeaderTitle linkTo={ rootPath }>
        Cadastro de Conta
      </HeaderTitle>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Email'
              type='email'
              name='email'
              id='email'
              validate={ [required] }
              component={ ReduxFormInput }
              inputMode='email'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='CPF'
              type='text'
              name='cpf'
              id='cpf'
              validate={ [required, cpfValidator] }
              component={ ReduxFormInput }
              normalize={ cpfNormalizer }
              inputMode='tel'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Senha'
              type={ isPasswordEyeActive === 'password' ? 'text' : 'password' }
              name='password'
              id='password'
              component={ ReduxFormInputWithAddon }
              onRightAddonClick={
                ({ name }) => togglePasswordEyeActive(isPasswordEyeActive === name ? false : name)
              }
              validate={ [required, weakPassword(scoreDescription[0])] }
            />
            <PasswordTips />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Confirmar'
              type={ isPasswordEyeActive === 'confirm' ? 'text' : 'password' }
              name='confirm'
              id='ipt_register_confirm'
              component={ ReduxFormInputWithAddon }
              onRightAddonClick={
                ({ name }) => togglePasswordEyeActive(isPasswordEyeActive === name ? false : name)
              }
              validate={ [required, passwordsMatch] }
            />
          </div>
        </div>
        <PasswordStrength score={ scoreDescription }>
          Digite uma senha segura
        </PasswordStrength>
        <Footer>
          <Button className='btn btn-primary mt-2 mt-md-0 w-100 w-md-auto' disabled={ invalid }>Enviar</Button>
        </Footer>
      </form>
    </Content>
  )
}

RegisterRegistration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  rootPath: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: formName,
})(RegisterRegistration)
