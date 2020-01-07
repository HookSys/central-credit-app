import React from 'react'
import PropTypes from 'prop-types'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, Links, Link } = SidePanelTemplate

const RepassSidePanel = ({ pages, routes, onChange }) => {
  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Repasse
          </Title>
        </Header>
        <Links>
          { Object.keys(routes).map((key) => {
            if (routes[key].hideMenu) {
              return null
            }

            return (
              <Link
                pages={ pages }
                routeKey={ key }
                key={ key }
                onClick={ onChange }
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

RepassSidePanel.propTypes = {
  routes: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}

RepassSidePanel.defaultProps = {
  onChange: () => {},
}

export default React.memo(RepassSidePanel)
