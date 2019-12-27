import React, { Fragment, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container, HeaderInfo } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { newEmployeeQuery, employeesListQuery } from 'company/queries/employees'
import { employeesAsyncRequest, employeeAsyncRequest, employeeResetSelected } from 'company/actions/employees'
import Avatar from 'components/Avatar'
import Button from 'components/Button'

import EmployeeViewSidePanel from './SidePanel'

const EmployeesView = ({ entity: { pages } }) => {
  const { showErrorToast } = useContext(ToastContext)
  const { employeeId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const employee = useSelector(({ company }) => company.employees.getIn(['options', 'selected']))
  const employees = useSelector(({ company }) => company.employees.get('results'))

  const employeeNotFound = () => {
    showErrorToast({
      message: 'Funcionário não encontrado!',
    })
    history.push(pages.EMPLOYEES.INDEX)
  }

  useEffect(() => () => dispatch(employeeResetSelected()), [])

  useEffect(() => {
    if (!employeeId) {
      employeeNotFound()
    } else {
      dispatch(employeeAsyncRequest(newEmployeeQuery, employeeId)).then((response) => {
        if (!response) {
          employeeNotFound()
        } else if (employees.size === 0) {
          dispatch(employeesAsyncRequest(employeesListQuery))
        }
      })
    }
  }, [employeeId])

  if (!employee) {
    return null
  }

  const status = employee.get('status')
  const fullname = employee.getFullName()
  const hasAccess = employee.get('possui_acesso')

  return (
    <Fragment>
      <EmployeeViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            <div
              className={ classNames('px-3 py-1 text-white text-center rounded', {
                'bg-danger': !hasAccess,
                'bg-success': hasAccess,
              }) }
            >
              { hasAccess ? 'Desbloqueado' : 'Bloqueado' }
            </div>
            <div
              className={ classNames('ml-3 px-3 py-1 text-white text-center rounded', {
                'bg-warning': status !== 'ativo',
                'bg-success': status === 'ativo',
              }) }
            >
              { `${ status.charAt(0).toUpperCase() }${ status.slice(1) }` }
            </div>
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button type='button' className='btn btn-link'>
            Demitir
          </Button>
          <Button type='button' className='btn btn-default'>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>

      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <div className='d-flex align-items-center'>
            <Avatar
              title={ fullname }
              className='text-dark border-dark'
            />
            <div className='d-flex flex-column justify-content-center ml-2'>
              <span className='d-block font-size-xl mb-n1'>{ fullname }</span>
              <span className='d-block text-low-dark'>{ `CPF: ${ employee.get('cpf') }` }</span>
            </div>
          </div>
        </ColumnLeft>
        <ColumnRight>
          <div className='d-flex justify-content-between justify-content-md-end flex-wrap'>
            <HeaderInfo
              title='Margem Disponível'
              className='mt-3 mt-md-0 pr-2'
            >
              { employee.getFormatedCurrency('margem_disponivel') }
            </HeaderInfo>
            <HeaderInfo
              title='Matrícula'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { `#${ employee.get('matricula') }` }
            </HeaderInfo>
            <HeaderInfo
              title='Data de Admissão'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { employee.getFormatedDate('admitido_em') }
            </HeaderInfo>
          </div>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <ViewTable title='Condições Gerais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Data de nascimento' value={ employee.getFormatedDate('nascimento') } />
            <ViewTableCell className='w-md-33' label='Sexo' value={ employee.get('sexo') } />
            <ViewTableCell className='w-md-33' label='Número de dependentes' value={ employee.get('dependentes') } />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Detalhes do Funcionário'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Cargo' value={ employee.get('cargo') } />
            <ViewTableCell className='w-md-25' label='Data de admissão' value={ employee.getFormatedDate('admitido_em') } />
            <ViewTableCell className='w-md-25' label='Percentual comprometido' value={ employee.getCompromisedPercent() } />
            <ViewTableCell className='w-md-25' label='Salário base por mês' value={ employee.getFormatedCurrency('salario') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Desconto INSS' value={ employee.getFormatedCurrency('inss') } />
            <ViewTableCell className='w-md-33' label='Desconto IRRF' value={ employee.getFormatedCurrency('irrf') } />
            <ViewTableCell className='w-md-33' label='Empréstimos em outros bancos' value={ employee.getFormatedCurrency('valor_emprestado_outros_bancos') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='E-mail' value={ employee.get('email') } />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Dados para Pagamento'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Banco' value={ employee.getIn(['pagamento', 'banco']) } />
            <ViewTableCell className='w-md-25' label='Agência' value={ employee.getIn(['pagamento', 'agencia']) } />
            <ViewTableCell className='w-md-25' label='Conta' value={ employee.getIn(['pagamento', 'conta']) } />
            <ViewTableCell className='w-md-25' label='Tipo de conta' value={ employee.getIn(['pagamento', 'tipo']) } />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Endereço'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='CEP' value={ employee.getIn(['endereco', 'cep']) } />
            <ViewTableCell className='w-md-25' label='Cidade' value={ employee.getIn(['endereco', 'cidade']) } />
            <ViewTableCell className='w-md-25' label='UF' value={ employee.getIn(['endereco', 'uf']) } />
            <ViewTableCell className='w-md-25' label='Bairro' value={ employee.getIn(['endereco', 'bairro']) } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Número' value={ employee.getIn(['endereco', 'numero']) } />
            <ViewTableCell className='w-md-25' label='Complemento' value={ employee.getIn(['endereco', 'complemento']) } />
            <ViewTableCell className='w-md-50' label='Endereço' value={ employee.getIn(['endereco', 'logradouro']) } />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato'>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='Celular' value={ employee.getFormatedPhone('telefone_celular') } />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato para Referência'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Nome completo' value={ employee.get('referencia_nome') } />
            <ViewTableCell className='w-md-33' label='Parentesco' value={ employee.get('referencia_parentesco') } />
            <ViewTableCell className='w-md-33' label='Telefone' value={ employee.getFormatedPhone('referencia_telefone') } />
          </ViewTableRow>
        </ViewTable>
      </Container>
    </Fragment>
  )
}

EmployeesView.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default EmployeesView
