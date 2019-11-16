import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgImage from 'components/SvgImage'
import { getFirstLetters } from 'helpers'

const isSvgImage = (icon) => icon && icon.viewBox && (
  <SvgImage icon={ icon } maxWidth='20px' maxHeight='20px' />
)
const isIcon = (Icon) => Icon && <Icon />

const Avatar = ({ title, icon, className }) => {
  return (
    <div className={ classNames('avatar', className) }>
      { isSvgImage(icon) || isIcon(icon) || getFirstLetters(title) }
    </div>
  )
}

Avatar.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.func,
}

Avatar.defaultProps = {
  className: '',
  icon: null,
}

export default Avatar
