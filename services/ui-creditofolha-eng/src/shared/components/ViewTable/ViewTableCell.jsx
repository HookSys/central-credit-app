import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ViewTableCell = ((props) => {
  const { className, label, value, noBorderLeft, borderColor } = props
  return (
    <div className={ classNames('w-100 p-2 mb-3 border-bottom', className, borderColor) }>
      <div className='font-size-sm text-muted'>{ label }</div>
      <div
        className={ classNames('ml-n3 pl-3', {
          'border-md-left': !noBorderLeft,
        }, borderColor) }
      >
        { value || '-' }
      </div>
    </div>
  )
})

ViewTableCell.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  noBorderLeft: PropTypes.bool,
  borderColor: PropTypes.string,
}

ViewTableCell.defaultProps = {
  className: '',
  value: '-',
  noBorderLeft: false,
  borderColor: '',
}

export { ViewTableCell }
