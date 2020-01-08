import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableCardItem = ((props) => {
  const { children, className, onClick, noBorder, noPadding } = props
  return (
    <div
      className={ classNames('row no-gutters', {
        'border-bottom border-gray': !noBorder,
      }) }
    >
      <div
        className='col-12'
        onClick={ onClick }
        role='presentation'
      >
        <div
          className={ classNames(className, {
            'p-2': !noPadding,
          }) }
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
  noBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
}

TableCardItem.defaultProps = {
  className: '',
  onClick: null,
  noBorder: false,
  noPadding: false,
}
