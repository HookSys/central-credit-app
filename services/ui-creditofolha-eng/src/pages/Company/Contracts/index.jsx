import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ContractsSidePanel from './SidePanel'

const Contracts = ({ children, structure, rootPath }) => {
  debugger
  return (
    <div className='row'>
      <div className='col-5'>
        { children }
        <ContractsSidePanel structure={ structure } rootPath={ rootPath } />
      </div>
    </div>
  )
}

Contracts.propTypes = {
  children: PropTypes.node.isRequired,
  structure: PropTypes.object.isRequired,
  rootPath: PropTypes.string.isRequired,
}

export default Contracts
