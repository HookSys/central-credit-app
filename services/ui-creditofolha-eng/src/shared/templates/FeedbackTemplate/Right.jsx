import PropTypes from 'prop-types'
import React from 'react'

const FeedbackRight = ({ children }) => (
  <div className='feedback-right bg-white'>
    { children }
  </div>
)

FeedbackRight.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FeedbackRight
