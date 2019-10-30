import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { SvgImage } from 'components'
import { useStructure } from 'engine'
import { Menu, Search, AccountCircle, Notifications, KeyboardArrowDown } from '@material-ui/icons'

const SideBar = () => {
  const structure = useStructure()

  const { LOGO } = structure
  return (
    <nav className='sidebar'>
      <div className={ classNames('sidebar-logo px-2', LOGO.CLASSNAME) }>
        <SvgImage icon={ LOGO.ICON } maxWidth='300px' maxHeight='40px' />
      </div>
      <div className='sidebar-content'>
      </div>
    </nav>
  )
}

SideBar.propTypes = {
}

SideBar.defaultProps = {
}

export default SideBar
