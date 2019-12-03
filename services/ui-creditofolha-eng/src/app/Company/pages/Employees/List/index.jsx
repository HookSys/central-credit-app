import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardAlert, CardContent, CardInfo } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { employeesAsyncRequest, employeesUpdatePage } from 'company/actions/employees'
import Pagination from 'components/Pagination'
import { EmployeeStatusDescription, EmployeeStatusColor } from 'company/constants/employee'
import { employeesListQuery } from 'company/queries/employees'

const EmployeesList = () => {
  const dispatch = useDispatch()
  const employees = useSelector(({ company }) => company.employees.get('results'))
  const options = useSelector(({ company }) => company.employees.get('options'))
  const pages = useSelector(({ company }) => company.employees.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  useEffect(() => {
    dispatch(employeesAsyncRequest(employeesListQuery))
  }, [selectedPage])

  const onPageChange = (page) => async () => {
    dispatch(employeesUpdatePage(page))
  }

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Quadro de Funcionários</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        { employees.size > 0 ? (
          <Cards>
            { employees.map((employee) => {
              const status = employee.get('status')
              return (
                <Card key={ employee.get('id') }>
                  <CardRow>
                    <CardTitle isAvatarVisible={ true }>
                      { employee.getFullName() }
                    </CardTitle>
                    <CardAlert type={ EmployeeStatusColor[status] }>
                      { EmployeeStatusDescription[status] }
                    </CardAlert>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Matrícula'>
                      { employee.get('matricula') }
                    </CardInfo>
                    <CardInfo title='Acesso'>
                      { employee.get('possui_acesso') ? 'Possui acesso' : 'Sem acesso' }
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
    </Fragment>
  )
}

export default EmployeesList
