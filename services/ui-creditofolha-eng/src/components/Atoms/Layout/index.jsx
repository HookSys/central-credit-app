import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Layout = ({ children, className, container, withMargin, title }) => {
  return (
    <div className={ classNames(className, {
      'mb-4': withMargin,
      'container': container,
    }) }
    >
      <h1 className='d-none'>
        { title }
      </h1>
      { children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  container: PropTypes.bool,
  withMargin: PropTypes.bool,
}

Layout.defaultProps = {
  className: '',
  container: false,
  withMargin: true,
}

export default Layout
