import React from 'react'
import PropTypes from 'prop-types'

import ContractsSidePanel from './SidePanel'

const Contracts = ({ entity: { pages }, parent, children }) => {
  return (
    <div className='row'>
      <div className='col-5'>
        { children }
        <ContractsSidePanel pages={ pages.CONTRACTS } routes={ parent.routes } />
      </div>
    </div>
  )
}

Contracts.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default Contracts
