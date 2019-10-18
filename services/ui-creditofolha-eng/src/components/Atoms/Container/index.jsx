import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, container, withMargin, title }) => {
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

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  container: PropTypes.bool,
  withMargin: PropTypes.bool,
}

Container.defaultProps = {
  className: '',
  container: false,
  withMargin: true,
}

export default Container
