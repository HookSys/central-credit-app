import React from 'react'
import PropTypes from 'prop-types'

import { SideBarProvider } from './SideBar'
import { SideNavigationProvider } from './SideNavigation'

const Providers = ({ children }) => {
  return (
    <div className='module-template'>
      <SideNavigationProvider>
        <SideBarProvider>
          { children }
        </SideBarProvider>
      </SideNavigationProvider>
    </div>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Providers
