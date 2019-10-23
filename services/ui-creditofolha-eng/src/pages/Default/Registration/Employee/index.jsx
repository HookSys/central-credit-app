import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import zxcvbn from 'zxcvbn'
import { CleanTemplate, ReduxFormInput, Button, PasswordStrength, PasswordTips } from 'components'
import withEngine from 'engine/withEngine'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { registerAsyncRequest } from 'actions/register'

import ReduxFormInputBuilder from 'components/Molecules/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/Molecules/ReduxFormInput/builders/InputAddonBuilder'

const formName = 'registerForm'
const selector = formValueSelector(formName)
const { Content, HeaderTitle, Footer } = CleanTemplate

const EmployeeRegistration = ({ handleSubmit, structure, appForm, invalid }) => {
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

  const dispatch = useDispatch()
  const onSubmit = (values) => {
    dispatch(registerAsyncRequest(values.get('cpf'), values.get('email'), values.get('password')))
  }

  const { ROUTES } = structure
  const { validators: { required, cpfValidator, weakPassword, passwordsMatch } } = appForm
  const { normalizers: { cpfNormalizer } } = appForm
  return (
    <Content>
      <HeaderTitle linkTo={ ROUTES.REGISTRATION.URL }>
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

EmployeeRegistration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  structure: PropTypes.object.isRequired,
  appForm: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: formName,
})(withEngine(EmployeeRegistration))
