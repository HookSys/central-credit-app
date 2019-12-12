import React from 'react'
import { useStructure } from 'hooks'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, BackLink, Links } = SidePanelTemplate

const areas = [{
  name: 'Dados pessoais',
}, {
  name: 'Detalhes do funcionário',
}, {
  name: 'Dados para pagamento',
}, {
  name: 'Endereço',
}, {
  name: 'Contato',
}, {
  name: 'Contato para referência',
}]

const EmployeeNewSidePanel = () => {
  const { pages } = useStructure()

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={ pages.EMPLOYEES.INDEX }>
            Voltar
          </BackLink>
          <Title>
            Novo Funcionário
          </Title>
        </Header>
        <Links>
          { areas.map((area) => {
            return (
              <a
                key={ area.name }
                className='pl-3'
              >
                { area.name }
              </a>
            )
          })}
        </Links>
      </Layout>
    </SidePanelRender>
  )
}

export default EmployeeNewSidePanel
