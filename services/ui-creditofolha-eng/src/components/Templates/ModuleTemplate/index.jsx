import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Content from './Content'
import SideBar from './SideBar'
import SidePanel from './SidePanel'
import Providers from './Providers'
import SideNavigation from './SideNavigation'

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f1f4'
  })
  return (
    <Fragment>
      <Providers>
        <SideNavigation>
          <SideBar />
          <SidePanel />
        </SideNavigation>
        <Content>
          <Header />
          <main role='main'>
            { children }
          </main>
        </Content>
      </Providers>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default {
  Layout
}
