import React, { useRef, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { SideBarProvider } from './SideBar'

const Providers = ({ children }) => {
  return (
    <div className='module-template'>
      <SideBarProvider>
        { children }
      </SideBarProvider>
    </div>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Providers
