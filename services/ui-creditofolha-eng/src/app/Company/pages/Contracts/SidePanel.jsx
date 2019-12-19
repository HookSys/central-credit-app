import React from 'react'
import PropTypes from 'prop-types'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, Links, Link } = SidePanelTemplate

const ContractsSidePanel = ({ pages, routes }) => {
  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Contratos
          </Title>
        </Header>
        <Links>
          { Object.keys(routes).map((key) => {
            return (
              <Link
                pages={ pages }
                routeKey={ key }
                key={ key }
              >
                { routes[key].name }
              </Link>
            )
          })}
        </Links>
      </Layout>
    </SidePanelRender>
  )
}

ContractsSidePanel.propTypes = {
  routes: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
}

export default ContractsSidePanel
