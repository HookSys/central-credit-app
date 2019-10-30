import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import MainHeader from './Header'
import MainContent from './Content'
import MainSideBar from './SideBar'
import Providers from './Providers';

const Layout = ({ children, isHorizontal }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f1f4'
  })
  return (
    <Fragment>
      <Providers>
        <MainSideBar />
        <MainContent>
          <MainHeader />
          <main role='main'>
            { children }
          </main>
        </MainContent>
      </Providers>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHorizontal: PropTypes.bool,
}

Layout.defaultProps = {
  isHorizontal: false,
}

export default {
  Layout
}
