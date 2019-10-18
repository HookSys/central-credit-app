import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { LibraryBooksOutlined } from '@material-ui/icons'

const Empty = ({ children, className }) => {
  return (
    <div className={ classNames('d-flex pt-5 align-items-center justify-content-center flex-column empty', className) }>
      <LibraryBooksOutlined />
      <span className='h2 mt-4'>
        { children }
      </span>
    </div>
  )
}

Empty.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Empty.defaultProps = {
  className: '',
}

export default Empty
