import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import EmployeeCard from 'company/components/EmployeeCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card, Action } = SidePanelTemplate

const EmployeeViewSidePanel = () => {
  const { pages } = useStructure()
  const { employeeId } = useParams()
  const history = useHistory()

  const employees = useSelector(({ company }) => company.employees.get('results'))
  // const options = useSelector(({ company }) => company.employees.get('options'))
  // const pages = useSelector(({ company }) => company.employees.getTotalPages())
  // const selectedPage = options.get('currentPageIndex')

  const onEmployeeCardClick = useCallback((employee) => () => {
    const route = bindPathParams({
      employeeId: employee.get('id'),
    }, pages.EMPLOYEES.VIEW)
    history.push(route)
  }, [])

  const onActionClick = useCallback(() => history.push(pages.EMPLOYEES.NEW), [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={ pages.EMPLOYEES.INDEX }>
            Voltar
          </BackLink>
          <Title>
            Funcionários
          </Title>
          <Action onClick={ onActionClick }>
            +
          </Action>
        </Header>
        { employees.size > 0 ? (
          <Cards>
            { employees.map((employee) => {
              return (
                <Card
                  key={ employee.get('id') }
                  isActive={ employee.get('id') === employeeId }
                  onClick={ onEmployeeCardClick(employee) }
                >
                  <EmployeeCard title={ employee.getFullName() } cpf={ employee.get('cpf') } />
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div className='w-100 text-center mt-2'>
            Sem registros
          </div>
        ) }
      </Layout>
    </SidePanelRender>
  )
}

export default React.memo(EmployeeViewSidePanel)
