import React from 'react'
import PropTypes from 'prop-types'


const Dashboard = ({ children }) => {
  return (
    <div className='row'>
      <div className='col-12'>
        { children }
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Dashboard
