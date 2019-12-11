import React from 'react'
import PropTypes from 'prop-types'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, Links, Link } = SidePanelTemplate

const EmployeesSidePanel = ({ pages, routes }) => {
  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Funcionários
          </Title>
        </Header>
        <Links>
          { Object.keys(routes).map((key) => {
            if (routes[key].hideMenu) {
              return null
            }

            return (
              <Link
                to={ pages[key] }
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

EmployeesSidePanel.propTypes = {
  routes: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
}

export default EmployeesSidePanel
