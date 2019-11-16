import React from 'react'
import PropTypes from 'prop-types'

import SidePanelLinks from './Links'
import SidePanelLink from './Link'
import SidePanelTitle from './Title'
import SidePanelHeader from './Header'
import SidePanelBackLink from './BackLink'

const Layout = ({ children }) => {
  return (
    <div className='sidepanel-template d-flex flex-column'>
      { children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default {
  Layout,
  Link: SidePanelLink,
  Title: SidePanelTitle,
  Links: SidePanelLinks,
  Header: SidePanelHeader,
  BackLink: SidePanelBackLink,
}
