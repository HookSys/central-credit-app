import React, { Fragment, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container, HeaderInfo } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { newEmployeeQuery } from 'company/queries/employees'
import { employeeAsyncRequest } from 'company/actions/employees'
import Avatar from 'components/Avatar'
import Button from 'components/Button'

const EmployeesView = ({ entity: { pages } }) => {
  const { showErrorToast } = useContext(ToastContext)
  const { employeeId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const employee = useSelector(({ company }) => company.employees.getIn(['options', 'selected']))

  const employeeNotFound = () => {
    showErrorToast({
      message: 'Funcionário não encontrado!',
    })
    history.push(pages.EMPLOYEES.INDEX)
  }

  useEffect(() => {
    if (!employeeId) {
      employeeNotFound()
    } else {
      dispatch(employeeAsyncRequest(newEmployeeQuery, employeeId)).then((response) => {
        if (!response) {
          employeeNotFound()
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
        <ColumnRight>
          <Button type='button' className='btn btn-link'>
            Demitir
          </Button>
          <Button type='button' className='btn btn-default bg-white'>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>

      <ColumnWrapper className='mt-0 mb-4'>
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
          <div className='d-flex'>
            <HeaderInfo
              title='Matrícula'
            >
              { `#${ employee.get('matricula') }` }
            </HeaderInfo>
            <HeaderInfo
              title='Data de Admissão'
              className='ml-4'
            >
              { employee.getFormatedDate('admitido_em') }
            </HeaderInfo>
          </div>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <ViewTable title='Condições Gerais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Data de nascimento' value='-' />
            <ViewTableCell className='w-md-33' label='Sexo' value='-' />
            <ViewTableCell className='w-md-33' label='Número de dependentes' value='-' />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Detalhes do Funcionário'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Cargo' value={ employee.get('cargo') } />
            <ViewTableCell className='w-md-25' label='Data de admissão' value={ employee.getFormatedDate('admitido_em') } />
            <ViewTableCell className='w-md-25' label='Percentual comprometido' value='-' />
            <ViewTableCell className='w-md-25' label='Salário base por mês' value={ employee.getFormatedCurrency('salario') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Desconto INSS' value='-' />
            <ViewTableCell className='w-md-25' label='Desconto IRRF' value='-' />
            <ViewTableCell className='w-md-25' label='Desconto Diversos' value='-' />
            <ViewTableCell className='w-md-25' label='Empréstimos em outros bancos' value='-' />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='E-mail' value='-' />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Dados para Pagamento'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Banco' value='-' />
            <ViewTableCell className='w-md-25' label='Agência' value='-' />
            <ViewTableCell className='w-md-25' label='Conta' value='-' />
            <ViewTableCell className='w-md-25' label='Tipo de conta' value='-' />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Endereço'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='CEP' value='-' />
            <ViewTableCell className='w-md-25' label='Cidade' value='-' />
            <ViewTableCell className='w-md-25' label='UF' value='-' />
            <ViewTableCell className='w-md-25' label='Bairro' value='-' />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Número' value='-' />
            <ViewTableCell className='w-md-25' label='Complemento' value='-' />
            <ViewTableCell className='w-md-50' label='Endereço' value='-' />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato'>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='Celular' value='-' />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato para Referência'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Nome completo' value='-' />
            <ViewTableCell className='w-md-33' label='Parentesco' value='-' />
            <ViewTableCell className='w-md-33' label='Telefone' value='-' />
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
