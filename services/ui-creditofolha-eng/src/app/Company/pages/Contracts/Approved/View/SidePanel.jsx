import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import ContractCard from 'company/components/ContractCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card } = SidePanelTemplate

const EmployeeViewSidePanel = () => {
  const { pages } = useStructure()
  const { contractId } = useParams()
  const history = useHistory()

  const contracts = useSelector(({ company }) => company.contracts.get('results'))

  const onContractCardClick = useCallback((contract) => () => {
    const route = bindPathParams({
      contractId: contract.get('id'),
    }, pages.CONTRACTS.APPROVED.VIEW)
    history.push(route)
  }, [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={ pages.CONTRACTS.APPROVED.INDEX }>
            Voltar
          </BackLink>
          <Title>
            Contratos
          </Title>
        </Header>
        { contracts.size > 0 ? (
          <Cards>
            { contracts.map((contract) => {
              const employee = contract.get('funcionario')
              return (
                <Card
                  key={ contract.get('id') }
                  isActive={ contract.get('id') === contractId }
                  onClick={ onContractCardClick(contract) }
                >
                  <ContractCard title={ employee.getFullName() } amount={ contract.getFormatedCurrency('valor_financiado') } />
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
