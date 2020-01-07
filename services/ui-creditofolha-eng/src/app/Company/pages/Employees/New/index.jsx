import React, { Fragment, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm, formValueSelector, FormSection } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import Avatar from 'components/Avatar'
import FormContent, { Row, Element } from 'company/components/FormContent'
import { civilState, ufs, documentTypes, banks, accountType } from 'constants/general'
import { useSelector, useDispatch } from 'react-redux'
import { useServices } from 'hooks'
import { useHistory } from 'react-router-dom'
import { employeeCreateRequest } from 'company/actions/employees'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'
import { required, cpfValidator, dateRequired } from 'form/validators'
import { dateNormalizer, phoneNormalizer, numbersNormalizer,
  cpfNormalizer, currencyMask, cepNormalizer } from 'form/normalizers'

import EmployeeFactory from 'factories/Employee'
import EmployeeNewSidePanel from './SidePanel'

export const formName = 'newEditEmployeeForm'
const selector = formValueSelector(formName)

const EmployeesNew = ({ handleSubmit, change, submit }) => {
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const cep = useSelector(state => selector(state, 'endereco.cep'))
  const services = useServices()
  const history = useHistory()
  const dispatch = useDispatch()

  const personalDataRef = useRef()
  const employeeDetailsRef = useRef()
  const paymentDataRef = useRef()
  const addressRef = useRef()
  const contactRef = useRef()
  const referenceContactRef = useRef()

  useEffect(() => {
    if (typeof cep === 'string' && cep.length >= 9) {
      // TODO: Criar um metodo no service para resgatar os endereços
      services.external({
        path: 'https://viacep.com.br/ws/:cep/json/unicode',
        pathParams: {
          cep: cep.replace(/[^0-9]/, ''),
        },
        method: 'GET',
      }).then((address) => {
        if (address && !address.error) {
          const { logradouro, complemento, bairro, localidade, uf } = address
          change('endereco.cidade', localidade)
          change('endereco.bairro', bairro)
          change('endereco.complemento', complemento)
          change('endereco.uf', uf)
          change('endereco.logradouro', logradouro)
        }
      })
    }
  }, [cep])

  const onSubmit = async (values) => {
    const request = EmployeeFactory.createRequest(values)
    const response = await dispatch(employeeCreateRequest(request))
    if (response) {
      showSuccessToast({
        message: 'Funcionário criado com sucesso!',
      })
    } else {
      showErrorToast({
        message: 'Favor corrigir os itens abaixo.',
      })
    }
  }

  return (
    <Fragment>
      <EmployeeNewSidePanel
        personalDataRef={ personalDataRef }
        employeeDetailsRef={ employeeDetailsRef }
        paymentDataRef={ paymentDataRef }
        addressRef={ addressRef }
        contactRef={ contactRef }
        referenceContactRef={ referenceContactRef }
      />
      <ColumnWrapper>
        <ColumnLeft>
          <div className='d-flex align-items-center'>
            <Avatar
              title='Novo Funcionário'
              className='text-dark border-dark'
            />
            <div className='d-flex flex-column justify-content-center ml-2'>
              <span className='d-block font-size-xl mb-n1'>Novo Funcionário</span>
            </div>
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button className='btn btn-default mr-3' onClick={ () => history.goBack() }>
            Cancelar
          </Button>
          <Button onClick={ () => submit() }>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true } autofocus={ true }>
        <Form onSubmit={ handleSubmit(onSubmit) }>
          <FormContent title='Dados pessoais' ref={ personalDataRef }>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='nome'
                  label='Nome: *'
                  id='nome'
                  placeholder='Nome'
                  component={ ReduxFormInput }
                  validate={ [required] }
                />
              </Element>
              <Element lg='6'>
                <Field
                  type='text'
                  name='sobrenome'
                  label='Sobrenome: *'
                  id='sobrenome'
                  placeholder='Sobrenome'
                  component={ ReduxFormInput }
                  validate={ [required] }
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='nascimento'
                  label='Data de Nascimento: *'
                  id='nascimento'
                  placeholder='Data de Nascimento'
                  component={ ReduxFormInput }
                  validate={ [dateRequired] }
                  normalize={ dateNormalizer }
                />
              </Element>
              <Element lg='4'>
                <Field
                  name='sexo'
                  label='Sexo: *'
                  id='sexo'
                  placeholder='Sexo'
                  options={ [
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Feminino' },
                  ] }
                  component={ ReduxFormSelect }
                  validate={ [required] }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='dependentes'
                  label='Número de dependentes: *'
                  id='dependentes'
                  placeholder='Número de dependentes'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  normalize={ numbersNormalizer }
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
                  component={ ReduxFormInput }
                  validate={ [required, cpfValidator] }
                  normalize={ cpfNormalizer }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='nome_mae'
                  label='Nome da mãe: *'
                  id='nome_mae'
                  placeholder='Nome da mãe'
                  component={ ReduxFormInput }
                  validate={ [required] }
                />
              </Element>
              <Element lg='4'>
                <Field
                  name='estado_civil'
                  label='Estado Civil: *'
                  id='estado_civil'
                  placeholder='Estado Civil'
                  component={ ReduxFormSelect }
                  options={ civilState }
                />
              </Element>
            </Row>
            <FormSection name='documento'>
              <Row>
                <Element lg='4'>
                  <Field
                    name='tipo'
                    label='Tipo de Documento: *'
                    id='tipo'
                    placeholder='Tipo de Documento'
                    options={ documentTypes }
                    component={ ReduxFormSelect }
                    validate={ [required] }
                  />
                </Element>
                <Element lg='4'>
                  <Field
                    type='text'
                    name='numero'
                    label='Número do documento: *'
                    id='numero'
                    placeholder='Número do documento'
                    component={ ReduxFormInput }
                    validate={ [required] }
                    normalize={ numbersNormalizer }
                  />
                </Element>
                <Element lg='4'>
                  <Field
                    type='text'
                    name='emissor'
                    label='Orgão emissor: *'
                    id='emissor'
                    placeholder='Orgão emissor'
                    component={ ReduxFormInput }
                  />
                </Element>
              </Row>
            </FormSection>
          </FormContent>
          <FormContent title='Detalhes do funcionário' ref={ employeeDetailsRef }>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='cargo'
                  label='Cargo: *'
                  id='cargo'
                  placeholder='Cargo'
                  component={ ReduxFormInput }
                  validate={ [required] }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='admitido_em'
                  label='Data de admissão: *'
                  id='admitido_em'
                  placeholder='Data de admissão'
                  component={ ReduxFormInput }
                  validate={ [dateRequired] }
                  normalize={ dateNormalizer }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='salario'
                  label='Salário base por mês: *'
                  id='salario'
                  placeholder='Salário base por mês'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  { ...currencyMask }
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='inss'
                  label='Desconto INSS: *'
                  id='inss'
                  placeholder='Desconto INSS'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  { ...currencyMask }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='irrf'
                  label='Desconto IRRF: *'
                  id='irrf'
                  placeholder='Desconto IRRF'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  { ...currencyMask }
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='valor_emprestado_outros_bancos'
                  label='Desconto diversos: *'
                  id='valor_emprestado_outros_bancos'
                  placeholder='Desconto diversos'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  { ...currencyMask }
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='matricula'
                  label='Matricula: *'
                  id='matricula'
                  placeholder='Matricula'
                  component={ ReduxFormInput }
                  validate={ [required] }
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Dados para pagamento (opcional)' ref={ paymentDataRef } name='pagamento'>
            <Row>
              <Element lg='6'>
                <Field
                  name='banco'
                  label='Banco:'
                  id='banco'
                  placeholder='Banco'
                  options={ banks }
                  component={ ReduxFormSelect }
                />
              </Element>
              <Element lg='6'>
                <Field
                  name='tipo'
                  label='Tipo de conta:'
                  id='tipo'
                  placeholder='Tipo de conta'
                  options={ accountType }
                  component={ ReduxFormSelect }
                />
              </Element>
            </Row>
            <Row>
              <Element sm='7' lg='4'>
                <Field
                  type='text'
                  name='agencia'
                  label='Agência:'
                  id='agencia'
                  placeholder='Agência'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element sm='5' lg='2'>
                <Field
                  type='text'
                  name='agencia_dac'
                  label='Dígito:'
                  id='agencia_dac'
                  placeholder='Dígito'
                  maxLength={ 1 }
                  component={ ReduxFormInput }
                />
              </Element>
              <Element sm='7' lg='4'>
                <Field
                  type='text'
                  name='conta'
                  label='Conta:'
                  id='conta'
                  placeholder='Conta'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element sm='5' lg='2'>
                <Field
                  type='text'
                  name='conta_dac'
                  label='Dígito:'
                  id='conta_dac'
                  maxLength={ 1 }
                  placeholder='Dígito'
                  component={ ReduxFormInput }
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Endereço' name='endereco' ref={ addressRef }>
            <Row>
              <Element lg='5'>
                <Field
                  type='text'
                  name='cep'
                  label='CEP: *'
                  id='cep'
                  placeholder='CEP'
                  component={ ReduxFormInput }
                  normalize={ cepNormalizer }
                  validate={ [required] }
                />
              </Element>
              <Element lg='5'>
                <Field
                  type='text'
                  name='cidade'
                  label='Cidade: *'
                  id='cidade'
                  placeholder='Cidade'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element lg='2'>
                <Field
                  name='uf'
                  label='UF: *'
                  id='uf'
                  placeholder='Estado'
                  options={ ufs }
                  component={ ReduxFormSelect }
                />
              </Element>
            </Row>
            <Row>
              <Element lg='5'>
                <Field
                  type='text'
                  name='bairro'
                  label='Bairro: *'
                  id='bairro'
                  placeholder='Bairro'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element lg='2'>
                <Field
                  type='text'
                  name='numero'
                  label='Número: *'
                  id='numero'
                  placeholder='Número'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element lg='5'>
                <Field
                  type='text'
                  name='complemento'
                  label='Complemento:'
                  id='complemento'
                  placeholder='Complemento'
                  component={ ReduxFormInput }
                />
              </Element>
            </Row>
            <Row>
              <Element lg='12'>
                <Field
                  type='text'
                  name='logradouro'
                  label='Endereço: *'
                  id='logradouro'
                  placeholder='Endereço'
                  component={ ReduxFormInput }
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Contato' ref={ contactRef }>
            <Row>
              <Element lg='3'>
                <Field
                  type='text'
                  name='telefone_celular'
                  label='Celular:'
                  id='telefone_celular'
                  placeholder='Celular'
                  component={ ReduxFormInput }
                  normalize={ phoneNormalizer }
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Contato para referência' ref={ referenceContactRef }>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='referencia_nome'
                  label='Nome completo:'
                  id='referencia_nome'
                  placeholder='Nome completo'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='referencia_parentesco'
                  label='Parentesco:'
                  id='referencia_parentesco'
                  placeholder='Parentesco'
                  component={ ReduxFormInput }
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='referencia_telefone'
                  label='Telefone:'
                  id='referencia_telefone'
                  placeholder='Telefone'
                  component={ ReduxFormInput }
                  normalize={ phoneNormalizer }
                />
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

EmployeesNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: formName,
})(EmployeesNew)
