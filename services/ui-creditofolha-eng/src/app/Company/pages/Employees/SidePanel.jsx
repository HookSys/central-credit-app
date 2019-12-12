import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, Links, Link, Action } = SidePanelTemplate

const EmployeesSidePanel = ({ pages, routes }) => {
  const history = useHistory()

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Funcionários
          </Title>
          <Action onClick={ () => history.push(pages.NEW) }>
            +
          </Action>
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
