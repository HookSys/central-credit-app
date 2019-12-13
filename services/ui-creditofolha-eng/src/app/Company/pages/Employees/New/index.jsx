import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm, formValueSelector, FormSection } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, Container } from 'templates/PageTemplate'
import Avatar from 'components/Avatar'
import FormContent, { Row, Element } from 'company/components/FormContent'
import { civilState, ufs, documentTypes, banks, accountType } from 'constants/general'
import { useSelector } from 'react-redux'
import { useServices } from 'hooks'

import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'
import { required, cpfValidator } from 'form/validators'
import { dateNormalizer, phoneNormalizer, numbersNormalizer,
  cpfNormalizer, currencyMask, cepNormalizer } from 'form/normalizers'

import EmployeeNewSidePanel from './SidePanel'

export const formName = 'newEditEmployeeForm'
const selector = formValueSelector(formName)

const EmployeesNew = ({ handleSubmit, change }) => {
  const cep = useSelector(state => selector(state, 'endereco[cep]'))
  const services = useServices()

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
          change('endereco[cidade]', localidade)
          change('endereco[bairro]', bairro)
          change('endereco[complemento]', complemento)
          change('endereco[uf]', uf)
          change('endereco[logradouro]', logradouro)
        }
      })
    }
  }, [cep])

  const onSubmit = () => {}

  return (
    <Fragment>
      <EmployeeNewSidePanel />
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
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <Form onSubmit={ handleSubmit(onSubmit) }>
          <FormContent title='Dados pessoais'>
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
                  validate={ [required] }
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
              <Row>
                <Element lg='4'>
                  <Field
                    name='emissao_em'
                    label='Data de emissão: *'
                    id='emissao_em'
                    placeholder='Data de emissão'
                    component={ ReduxFormInput }
                    normalize={ dateNormalizer }
                  />
                </Element>
              </Row>
            </FormSection>
          </FormContent>
          <FormContent title='Detalhes do funcionário'>
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
                  validate={ [required] }
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
                  normalize={ dateNormalizer }
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
                  normalize={ dateNormalizer }
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
                  normalize={ dateNormalizer }
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
          <FormContent title='Dados para pagamento (opcional)' name='pagamento'>
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
                  placeholder='Dígito'
                  component={ ReduxFormInput }
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Endereço' name='endereco'>
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
                  label='Complemento: *'
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
          <FormContent title='Contato'>
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
          <FormContent title='Contato para referência'>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='referencia_nome'
                  label='Nome completo: *'
                  id='referencia_nome'
                  placeholder='Nome completo'
                  component={ ReduxFormInput }
                  validate={ [required] }
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
                  label='Telefone: *'
                  id='referencia_telefone'
                  placeholder='Telefone'
                  component={ ReduxFormInput }
                  normalize={ phoneNormalizer }
                  validate={ [required] }
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
  // submit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: formName,
})(EmployeesNew)
