import React from 'react'
import PropTypes from 'prop-types'

export const TableBody = ((props) => {
  const { children, className } = props
  return (
    <tbody className={ className }>
      { children }
    </tbody>
  )
})

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

TableBody.defaultProps = {
  className: '',
}
