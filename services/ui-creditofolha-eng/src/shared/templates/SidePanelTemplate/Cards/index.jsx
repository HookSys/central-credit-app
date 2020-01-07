import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SidePanelCards = ({ children, className, maxHeight }) => {
  return (
    <div
      className={ classNames('d-flex align-items-center flex-column w-100 overflow-auto mt-3', className) }
      style={ { maxHeight } }
    >
      { children }
    </div>
  )
}

SidePanelCards.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxHeight: PropTypes.string,
}

SidePanelCards.defaultProps = {
  className: '',
  maxHeight: '90vh',
}

export default React.memo(SidePanelCards)