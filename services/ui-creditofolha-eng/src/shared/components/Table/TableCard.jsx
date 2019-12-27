import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export const TableCard = ((props) => {
  const { children, className, hasChild, isChildOpen, isInvalid } = props
  return (
    <TableRow
      className={ classNames('d-lg-none', className) }
      hasChild={ hasChild }
      isChildOpen={ isChildOpen }
    >
      <TableCell
        className={ classNames('px-2', {
          'border border-danger': isInvalid,
        }) }
      >
        { children }
      </TableCell>
    </TableRow>
  )
})

TableCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasChild: PropTypes.bool,
  isChildOpen: PropTypes.bool,
  isInvalid: PropTypes.bool,
}

TableCard.defaultProps = {
  className: '',
  hasChild: false,
  isChildOpen: false,
  isInvalid: false,
}
