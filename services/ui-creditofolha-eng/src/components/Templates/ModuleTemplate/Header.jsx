import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { SvgImage } from 'components'
import { useStructure } from 'engine'
import { Menu, Search, AccountCircle, Notifications, KeyboardArrowDown } from '@material-ui/icons'

const Header = () => {
  const structure = useStructure()

  const { LOGO } = structure
  return (
    <header role='header'>
      <div className='navbar navbar-dark bg-secondary navbar-md-light bg-md-white fixed-top shadow-sm'>
        <div className='row w-100 no-gutters'>
          <div className='d-flex d-md-none'>
            <button className='navbar-toggler p-0 border-0 text-white' type='button'>
              <Menu className='font-size-3xl' />
            </button>
            <div className={ classNames('navbar-small-logo ml-2', LOGO.SMALL_CLASSNAME) }>
              <SvgImage icon={ LOGO.SMALL_ICON } />
            </div>
          </div>
          <div className='d-flex align-items-center ml-auto mr-2 text-white text-md-dark'>
            <div className='d-flex flex-row-reverse align-items-center'>
              <div className='d-md-none border-left border-white pl-2'>
                <AccountCircle className='font-size-3xl' />
              </div>
              <div className='d-md-none border-left border-white px-2'>
                <Search className='font-size-3xl' />
              </div>
              <div className='d-none d-md-flex flex-row-reverse'>
                <div className='d-flex flex-row-reverse font-size-sm border-left border-low-dark navbar-actions'>
                  <div className='d-flex align-items-center navbar-actions-arrow'>
                    <KeyboardArrowDown className='text-low-dark' />
                  </div>
                  <div className='navbar-user-avatar'>
                    <h6 className='text-primary p-0 m-0'>V</h6>
                  </div>
                  <div className='d-flex flex-column justify-content-center text-right mr-3 pl-3'>
                    <span className='d-block font-weight-bold small-line-height'>
                      Victor Lima
                    </span>
                    <span className='d-block small-line-height'>
                      Onidata
                    </span>
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-center border-left border-low-dark px-3 font-size-sm navbar-notifications'>
                  <Notifications className='text-low-dark' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
}

Header.defaultProps = {
}

export default Header
