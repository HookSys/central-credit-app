import React, { Fragment, useEffect, useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardContent, CardInfo, CardAction, CardAlert } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { employeesAsyncRequest, employeesUpdatePage, employeeFireRequest } from 'company/actions/employees'
import Pagination from 'components/Pagination'
import Button from 'components/Button'
import { ToastContext } from 'components/ToastProvider'
import { employeesListQuery } from 'company/queries/employees'
import EmployeesSearchForm from 'company/components/EmployeesSearchForm'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import { EmployeeStatus } from 'company/constants/employee'
import OrderingBuilder, { ORDERS } from 'components/OrderingBuilder'
import { bindPathParams } from 'helpers'

const ConfirmDemissionModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true,
})

const employeesOrdering = OrderingBuilder()
  .add('valor_emprestado', ORDERS.DESC)
  .build()

const EmployeesDemissionList = ({ entity: { pages: entityPages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const [employeeToFire, setEmployeeToFire] = useState(null)
  const employees = useSelector(({ company }) => company.employees.get('results'))
  const options = useSelector(({ company }) => company.employees.get('options'))
  const pages = useSelector(({ company }) => company.employees.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestEmployeesList = useCallback(() => {
    dispatch(employeesAsyncRequest(employeesListQuery, EmployeeStatus.ACTIVE, employeesOrdering))
  }, [])

  useEffect(() => {
    requestEmployeesList()
  }, [selectedPage])

  const onPageChange = (page) => async () => {
    dispatch(employeesUpdatePage(page))
  }

  const onEmployeeClick = (employee) => () => {
    if (!employee.hasContracts()) {
      setEmployeeToFire(employee)
    } else {
      const route = bindPathParams({
        employeeId: employee.get('id'),
      }, entityPages.EMPLOYEES.DEMISSION.INFORM)
      history.push(route)
    }
  }

  const onDemissionConfirm = async () => {
    const firedDate = moment().format('DD/MM/YYYY')
    const response = await dispatch(employeeFireRequest(employeeToFire.get('id'), firedDate, 0))
    setEmployeeToFire(null)
    if (response) {
      showSuccessToast({
        message: 'Funcionário demitido com sucesso!',
      })
      requestEmployeesList()
    } else {
      showErrorToast({
        message: 'Ocorreu um problema ao processar a requisição, tente novamente!',
      })
    }
  }

  const onDemissionClose = () => {
    setEmployeeToFire(null)
  }

  return (
    <Fragment>
      <EmployeesSearchForm requestEmployeesList={ requestEmployeesList } />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Demissão de funcionário</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        { employees.size > 0 ? (
          <Cards>
            { employees.map((employee) => {
              const hasContracts = employee.hasContracts()
              return (
                <Card key={ employee.get('id') }>
                  <CardRow>
                    <CardTitle isAvatarVisible={ true }>
                      { employee.getFullName() }
                    </CardTitle>
                    <CardAction>
                      <Button className='btn btn-light btn-sm' onClick={ onEmployeeClick(employee) }>
                        Demitir
                      </Button>
                    </CardAction>
                  </CardRow>
                  <CardRow className='mt-2'>
                    <CardAlert type={ !hasContracts ? 'dark' : 'danger' }>
                      { hasContracts ? 'Possui contratos' : 'Sem contratos' }
                    </CardAlert>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='CPF'>
                      { employee.get('cpf') }
                    </CardInfo>
                    <CardInfo title='Matricula'>
                      { employee.get('matricula') }
                    </CardInfo>
                  </CardContent>
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div>
            Empty
          </div>
        )}
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={ pages }
            selectedPage={ selectedPage }
            onChange={ onPageChange }
          />
        </ColumnLeft>
      </ColumnWrapper>
      <ConfirmDemissionModal
        onConfirm={ onDemissionConfirm }
        onCancel={ onDemissionClose }
        isOpen={ employeeToFire !== null }
      >
        <span>
          Deseja confirmar a demissão de <strong>{ `${ employeeToFire ? employeeToFire.getFullName() : '' }` }</strong>?
        </span>
      </ConfirmDemissionModal>
    </Fragment>
  )
}

EmployeesDemissionList.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default EmployeesDemissionList
