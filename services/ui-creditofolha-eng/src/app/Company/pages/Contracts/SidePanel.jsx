import React from 'react'
import PropTypes from 'prop-types'
import { SidePanelTemplate } from 'templates'
import { SidePanelRender } from 'components'

const { Layout, Header, Title, Links, Link } = SidePanelTemplate

const ContractsSidePanel = ({ structure: { SIDEPANEL_ROUTES }, rootPath }) => {
  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Contratos
          </Title>
        </Header>
        <Links>
          { Object.keys(SIDEPANEL_ROUTES).map((key) => {
            return (
              <Link
                to={ `${ rootPath }${ SIDEPANEL_ROUTES[key].URL }` }
                routeKey={ key }
                key={ key }
              >
                { SIDEPANEL_ROUTES[key].NAME }
              </Link>
            )
          })}
        </Links>
      </Layout>
    </SidePanelRender>
  )
}

ContractsSidePanel.propTypes = {
  structure: PropTypes.object.isRequired,
  rootPath: PropTypes.string.isRequired,
}

export default ContractsSidePanel
