import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SidePanelCard = ({ children, className, onClick, isActive }) => {
  return (
    <button
      type='button'
      className={ classNames('btn sidepanel-card w-100 px-0 mb-2', className, {
        'active': isActive,
      }) }
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

SidePanelCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
}

SidePanelCard.defaultProps = {
  className: '',
  onClick: null,
  isActive: false,
}

export default SidePanelCard
