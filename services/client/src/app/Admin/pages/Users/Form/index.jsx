import React, { Fragment, useEffect, useContext, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm, formValueSelector, arrayPush, arrayRemove } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import UserInfo from 'components/UserInfo'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { companiesAsyncRequest } from 'admin/actions/companies'
import { userCreateRequest, userAsyncRequest, userResetSelected,
  userEditRequest, usersAsyncRequest } from 'admin/actions/users'
import { Map, List, fromJS } from 'immutable'
import Checkbox from 'components/Checkbox'
import UsersFactory from 'factories/Users'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from 'components/Table'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
// import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'

import { required, cpfValidator, email } from 'form/validators'
import { cpfNormalizer } from 'form/normalizers'

export const formName = 'newEditUserForm'
const formSelector = formValueSelector(formName)

const UsersForm = (
  { handleSubmit, submit, pristine, reset, invalid, initialize, profile: { pages } }
) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const { userId } = useParams()
  const user = useSelector(({ admin }) => admin.users.getIn(['options', 'selected']))
  const companies = useSelector(({ admin }) => admin.companies.get('results'))
  const profiles = useSelector((state) => formSelector(state, 'profiles'))
  const history = useHistory()
  const dispatch = useDispatch()

  const personalDataRef = useRef()
  const initialUserValues = useRef()

  const userNotFound = useCallback(() => {
    showErrorToast({
      message: 'Usuário não encontrado!'
    })
    history.push(pages.USERS.INDEX)
  }, [])

  useEffect(() => () => {
    toggleEditMode(false)
    dispatch(userResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (!companies || companies.size === 0) {
      dispatch(companiesAsyncRequest(true))
    }
    if (userId) {
      if (!user) {
        dispatch(userAsyncRequest(userId)).then((response) => {
          if (!response) {
            userNotFound()
            return
          }
          toggleEditMode(true)
        })
      } else {
        toggleEditMode(true)
      }
    } else {
      toggleEditMode(false)
    }
  }, [userId, companies])

  const setFocus = () => setTimeout(() => {
    const { current: personalData } = personalDataRef
    const input = personalData.querySelector('input')
    if (input) {
      input.focus()
    }
  })

  useEffect(() => {
    if (isEditMode && user) {
      initialUserValues.current = user
      initialize(new Map({
        firstName: user.get('firstName'),
        lastName: user.get('lastName'),
        email: user.get('email'),
        cpf: user.get('cpf'),
        isSuperAdmin: user.get('isSuperAdmin'),
        profiles: fromJS(user.get('profiles').map((p) => p.getAsCompany()))
      }))
    } else if (!isEditMode) {
      initialize(new Map({
        profiles: new List(),
        isSuperAdmin: false
      }))
    }
    setFocus()
  }, [isEditMode, user])

  const onSubmit = useCallback(async (values) => {
    if (!userId) {
      const request = UsersFactory.createRequest(values)
      const response = await dispatch(userCreateRequest(request))
      if (response) {
        showSuccessToast({
          message: 'Usuário criado com sucesso!'
        })
        setTimeout(() => {
          reset()
          setFocus()
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    } else {
      const request = UsersFactory.editRequest(values)
      const response = await dispatch(userEditRequest(userId, request))
      if (response) {
        showSuccessToast({
          message: 'Usuário alterado com sucesso!'
        })
        await dispatch(usersAsyncRequest(true))
        setTimeout(() => history.goBack())
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }, [userId, initialUserValues])

  const onSelectedChange = useCallback((company, isSelected) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isSelected < 0) {
      dispatch(arrayPush(formName, 'profiles', Map({
        id: company.get('id'),
        name: company.get('name'),
        code: company.get('code')
      })))
    } else {
      dispatch(arrayRemove(formName, 'profiles', isSelected))
    }
  }, [])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='font-weight-lighter text-low-dark'
            fullName={isEditMode ? user.getFullName() : 'Novo Usuário'}
          >
            { isEditMode && (`CPF: ${user.get('cpf')}`) }
          </UserInfo>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Voltar
          </Button>
          <Button onClick={() => submit()} disabled={invalid || (isEditMode && pristine)}>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container isWhiteBackground={true} autofocus={true}>
          <FormContent title='Dados pessoais' ref={personalDataRef}>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='firstName'
                  label='Nome: *'
                  id='firstName'
                  placeholder='Nome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='6'>
                <Field
                  type='text'
                  name='lastName'
                  label='Sobrenome: *'
                  id='lastName'
                  placeholder='Sobrenome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='cpf'
                  label='CPF: *'
                  id='cpf'
                  placeholder='CPF'
                  component={ReduxFormInput}
                  validate={[required, cpfValidator]}
                  normalize={cpfNormalizer}
                />
              </Element>
              <Element lg='8'>
                <Field
                  type='text'
                  name='email'
                  label='Email: *'
                  id='email'
                  placeholder='Email'
                  component={ReduxFormInput}
                  validate={[required, email]}
                />
              </Element>
            </Row>
            { !isEditMode && (
              <Row>
                <Element lg='12'>
                  <p className='mt-3'><strong>** Usuário será criado com a senha padrão <span className='text-primary'>Trocar123</span> **</strong></p>
                </Element>
              </Row>
            )}
          </FormContent>
        </Container>
        <Container className='mt-3'>
          <FormContent>
            <Row>
              <Element lg='12'>
                <Table className='min-width-lg-only mt-4 mt-lg-0'>
                  <TableHead className='d-none d-lg-table-row'>
                    <TableHeader width={10} />
                    <TableHeader width='100px'>Empresa</TableHeader>
                    <TableHeader>Código</TableHeader>
                  </TableHead>
                  <TableBody>
                    {companies.size > 0 ? companies.map((c) => {
                      const companyId = c.get('id')
                      const isSelected = profiles && profiles.findIndex((p) => p.get('id') === companyId)
                      return (
                        <TableRow key={companyId} onClick={onSelectedChange(c, isSelected)}>
                          <TableCell>
                            <Checkbox
                              id={`company-${companyId}`}
                              name={`company-${companyId}`}
                              checked={isSelected >= 0}
                              onChange={onSelectedChange(c, isSelected)}
                            />
                          </TableCell>
                          <TableCell className='text-primary font-weight-bold'>{c.get('name')}</TableCell>
                          <TableCell><code>{c.get('code')}</code></TableCell>
                        </TableRow>
                      )
                    }) : (
                      <TableRow>
                        <TableCell colSpan={3} className='text-primary font-weight-bold'>Sem empresas cadastradas</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Element>
            </Row>
          </FormContent>
        </Container>
      </Form>

    </Fragment>
  )
}

UsersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: formName
})(UsersForm)
