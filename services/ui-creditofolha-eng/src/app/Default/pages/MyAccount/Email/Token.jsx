import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'templates/PageTemplate'
import { useSelector, useDispatch } from 'react-redux'
import { reduxForm, Form } from 'redux-form/immutable'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import Token from 'components/Token'
import Button from 'components/Button'
import { ToastContext } from 'components/ToastProvider'
import { myAccountEmailVerifyToken, myAccountEmailSendToken } from 'default/actions/myAccount'

import { formName } from '.'

const MyAccountEmailToken = ({ handleSubmit, entity: { pages } }) => {
  const location = useLocation()
  if (!location.state || !location.state.email) {
    return (
      <Redirect to={ pages.MY_ACCOUNT.EMAIL.INDEX } />
    )
  }

  const { showSuccessToast } = useContext(ToastContext)
  const tokenError = useSelector(state => state.errors.getFieldError('token'))
  const dispatch = useDispatch()
  const history = useHistory()
  const { state: { email } } = location

  const onSubmit = async (values) => {
    const token = values.get('token').join('')
    const response = await dispatch(myAccountEmailVerifyToken(token))
    if (response) {
      showSuccessToast({
        message: 'Token validado',
      })
      history.push(pages.MY_ACCOUNT.EMAIL.CONFIRM, {
        email,
        token,
      })
    }
  }

  const onResendToken = async () => {
    const response = await dispatch(myAccountEmailSendToken(email))
    if (response) {
      showSuccessToast({
        message: 'Token enviado',
      })
    }
  }

  return (
    <Container className='p-3 p-md-4'>
      <Form onSubmit={ handleSubmit(onSubmit) }>
        <div className='row'>
          <div className='col-12 col-lg-6 offset-lg-3'>
            <div className='px-3 px-md-0 text-center'>
              <h3>Confira suas mensagens</h3>
              <p className='d-block my-4'>
                Acabamos de enviar para o email <strong>{ email }</strong> o código de verificação.
                Insira o código que enviamos abaixo para alterar seu e-mail.
              </p>
            </div>

            <Token
              className='px-2 px-sm-5 pt-4 pb-3'
              iClassName='px-1 px-sm-2'
              tokenErrors={ tokenError }
            />

            <div className='mt-4 text-center'>
              <span className='d-block'>Não recebeu o código?</span>
              <Button type='button' className='btn btn-link p-0 m-0' onClick={ onResendToken }>Enviar código novamente</Button>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  )
}

MyAccountEmailToken.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
}

export default reduxForm({
  form: formName,
})(MyAccountEmailToken)
