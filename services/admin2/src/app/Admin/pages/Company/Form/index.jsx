import React, { Fragment, useEffect, useContext, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { companyCreateRequest, companyAsyncRequest, companyResetSelected,
  companyEditRequest } from 'admin/actions/companies'
import { Map } from 'immutable'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import ReduxFormInput from 'components/ReduxFormInput'

import { required, cnpjValidator } from 'form/validators'
import { cnpjNormalizer } from 'form/normalizers'

export const formName = 'newEditCompanyForm'

const CompaniesForm = (
  { handleSubmit, submit, reset, pristine, invalid, initialize, profile: { pages } }
) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const { companyId } = useParams()
  const company = useSelector(({ admin }) => admin.companies.getIn(['options', 'selected']))
  const history = useHistory()
  const dispatch = useDispatch()

  const personalDataRef = useRef()
  const initialCompanyValues = useRef()

  const companyNotFound = useCallback(() => {
    showErrorToast({
      message: 'Empresa não encontrada!'
    })
    history.push(pages.COMPANIES.INDEX)
  }, [])

  useEffect(() => () => {
    toggleEditMode(false)
    dispatch(companyResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (companyId) {
      if (!company) {
        dispatch(companyAsyncRequest(companyId)).then((response) => {
          if (!response) {
            companyNotFound()
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
  }, [companyId])

  const setFocus = () => setTimeout(() => {
    const { current: personalData } = personalDataRef
    const input = personalData.querySelector('input')
    if (input) {
      input.focus()
    }
  })

  useEffect(() => {
    if (isEditMode && company) {
      initialCompanyValues.current = company
      initialize(new Map({
        name: company.get('name'),
        code: company.get('code'),
        cnpj: cnpjNormalizer(company.get('cnpj'))
      }))
    }
    setFocus()
  }, [isEditMode, company])


  const onSubmit = useCallback(async (values) => {
    if (!companyId) {
      const response = await dispatch(companyCreateRequest(values))
      if (response) {
        showSuccessToast({
          message: 'Empresa criada com sucesso!'
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
      const response = await dispatch(companyEditRequest(companyId, values))
      if (response) {
        showSuccessToast({
          message: 'Empresa alterada com sucesso!'
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }, [companyId, initialCompanyValues])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          { isEditMode ? (<Title>{company.get('name')}</Title>) : (<Title>Cadastro de Empresas</Title>)}
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
      <Container isWhiteBackground={true} autofocus={true}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent title='Dados pessoais' ref={personalDataRef}>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='name'
                  label='Nome: *'
                  id='name'
                  placeholder='Nome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='code'
                  label='Código: *'
                  id='code'
                  disabled={isEditMode}
                  placeholder='Código'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='cnpj'
                  label='CNPJ:'
                  id='cnpj'
                  placeholder='CNPJ'
                  component={ReduxFormInput}
                  validate={[cnpjValidator]}
                  normalize={cnpjNormalizer}
                />
              </Element>
            </Row>
            { isEditMode && company && (
              <Row>
                <Element lg='12'>
                  <p className='mt-3'>
                    <strong>
                      Última sincronização:
                      <span className='text-primary'> { company.getFormatedDate('lastSync', 'DD/MM/YYYY [às] hh:mm')}</span>
                    </strong>
                  </p>
                </Element>
              </Row>
            )}
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

CompaniesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(CompaniesForm)
