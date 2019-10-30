import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { SvgImage } from 'components'

const { AVAILABLE_IMAGES } = SvgImage

const Container = ({ children, className, isCentered, size }) => {
  return (
    <div
      className={ classNames('row h-100', className, {
        'justify-content-md-center align-items-md-center': isCentered,
      }) }
    >
      <div className={ classNames(size, 'bg-white content') }>
        { children }
        <div className='d-flex footer-logo'>
          <SvgImage icon={ AVAILABLE_IMAGES.ONIDATA_LOGO } maxWidth='85px' maxHeight='25px' />
        </div>
      </div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  isCentered: PropTypes.bool,
}

Container.defaultProps = {
  className: '',
  size: 'col-12 col-md-6',
  isCentered: true,
}

export default Container