import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ViewTableCell = ((props) => {
  const { className, label, value, noBorderLeft, borderColor, noFullWidth } = props
  return (
    <div
      className={ classNames('p-2 mb-3 border-bottom', className, borderColor, {
        'w-100': !noFullWidth,
      }) }
    >
      { label && (<div className='font-size-sm text-muted'>{ label }</div>) }
      <div
        className={ classNames('ml-n3 pl-3 text-truncate', {
          'border-md-left': !noBorderLeft,
        }, borderColor) }
      >
        { value || '-' }
      </div>
    </div>
  )
})

ViewTableCell.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  noBorderLeft: PropTypes.bool,
  noFullWidth: PropTypes.bool,
  borderColor: PropTypes.string,
}

ViewTableCell.defaultProps = {
  label: null,
  className: '',
  value: '-',
  noBorderLeft: false,
  noFullWidth: false,
  borderColor: '',
}

export { ViewTableCell }
