import PropTypes from 'prop-types'
import React from 'react'
import { SvgImage } from 'components'
import classNames from 'classnames'

const FeedbackHeader = ({ desktopIconName, mobileIconName, children, bgClassName }) => (
  <div className={ classNames('feedback-header', bgClassName) }>
    <div className='d-block d-md-none mobile-icon'>
      <SvgImage icon={ mobileIconName } />
    </div>
    <h2 className='d-block font-weight-bold font-md-weight-light'>{ children }</h2>
    <div className='d-none d-md-block desktop-icon'>
      <SvgImage icon={ desktopIconName } />
    </div>
  </div>
)

FeedbackHeader.propTypes = {
  desktopIconName: PropTypes.string.isRequired,
  mobileIconName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  bgClassName: PropTypes.string,
}

FeedbackHeader.defaultProps = {
  bgClassName: 'bg-default',
}

export default FeedbackHeader
