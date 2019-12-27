import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableCardItem = ((props) => {
  const { children, className, onClick } = props
  return (
    <div className='row no-gutters border-bottom border-gray'>
      <div
        className='col-12'
        onClick={ onClick }
        role='presentation'
      >
        <div
          className={ classNames('p-2', className) }
        >
          { children }
        </div>
      </div>
    </div>
  )
})

TableCardItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

TableCardItem.defaultProps = {
  className: '',
  onClick: null,
}
