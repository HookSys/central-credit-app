import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Page = ({ children, className, isFluid, title }) => {
  return (
    <div className={ classNames('mt-4', className, {
      'container-fluid': isFluid,
      'container': !isFluid,
    }) }
    >
      <h1 className='d-none'>
        { title }
      </h1>
      { children }
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFluid: PropTypes.bool,
  title: PropTypes.string,
}

Page.defaultProps = {
  className: '',
  isFluid: true,
  title: 'Crédito Folha',
}

export default Page
