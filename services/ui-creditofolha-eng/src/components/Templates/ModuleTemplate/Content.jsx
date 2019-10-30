import React from 'react'
import PropTypes from 'prop-types'

const Content = ({ children }) => {
  return (
    <div className='d-flex flex-column content'>
      { children }
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content
