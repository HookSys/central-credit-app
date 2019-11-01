import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import { SvgImage, Dropdown } from 'components'
import { useStructure, useEngine } from 'engine'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { userLogout, userSelectEntity } from 'actions/user'

import {
  Menu,
  Search,
  AccountCircle,
  Notifications,
  KeyboardArrowDown,
  AccountBox,
  Assignment,
  SupervisorAccount,
  ExitToApp,
} from '@material-ui/icons'

import { SideNavigationContext } from './SideNavigation'

const Header = () => {
  const dropdown = useRef()
  const history = useHistory()
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)
  
  const structure = useStructure()
  const defaultStructure = useEngine(
    ({ structures: { MODULES: { DEFAULT }, ...STRUCTURES } }) => STRUCTURES[DEFAULT]
  )

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.get('data'))
  const entity = user.getSelectedEntity()

  const { ROUTES } = defaultStructure
  const { LOGO } = structure
  return (
    <header role='header'>
      <div className='navbar navbar-dark bg-secondary navbar-md-light bg-md-white fixed-top shadow-sm'>
        <div className='row w-100 no-gutters'>
          <div className='d-flex d-md-none'>
            <button className='navbar-toggler p-0 border-0 text-white' type='button'>
              <Menu className='font-size-3xl' onClick={ () => toggleSideNavigation(!isSideNavigationVisible) } />
            </button>
            <div className={ classNames('navbar-small-logo ml-2', LOGO.SMALL_CLASSNAME, {
              'is-hided': isSideNavigationVisible,
            }) }>
              <SvgImage icon={ LOGO.SMALL_ICON } isOverflowHideen={ true } />
            </div>
          </div>
          <div className='d-flex align-items-center ml-auto mr-2 text-white text-md-dark'>
            <div className='d-flex flex-row-reverse align-items-center'>
              <div className='d-md-none border-left border-white pl-2'>
                <AccountCircle
                  className='font-size-3xl'
                  onClick={ (ev) => dropdown.current.show(ev) }
                />
              </div>
              <div className='d-md-none border-left border-white px-2'>
                <Search className='font-size-3xl' />
              </div>
              <div className='d-none d-md-flex flex-row-reverse'>
                <div
                  role='presentation'
                  onClick={ (ev) => dropdown.current.show(ev) }
                  className='d-flex flex-row-reverse font-size-sm border-left border-low-dark navbar-actions'
                >
                  <div className='d-flex align-items-center navbar-actions-arrow'>
                    <KeyboardArrowDown className='text-low-dark' />
                  </div>
                  <div className='navbar-user-avatar'>
                    <h6 className='text-primary p-0 m-0'>V</h6>
                  </div>
                  <div className='d-flex flex-column justify-content-center text-right mr-3 pl-3'>
                    <span className='d-block font-weight-bold small-line-height'>
                      { user.get('fullName') }
                    </span>
                    <span className='d-block small-line-height'>
                      { entity.get('entidade_nome') }
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
      <Dropdown ref={ dropdown }>
        <Dropdown.Header className='flex-column pl-5'>
          <div className='pl-2'>
            <span className='d-block'>
              { user.get('fullName') }
            </span>
            <span className='d-block opacity-05 small-line-height'>
              { structure.NAME }
            </span>
          </div>
        </Dropdown.Header>
        <Dropdown.Action
          onClick={ () => {} }
          icon={ AccountBox }
          className='pl-2'
        >
          Minha Conta
        </Dropdown.Action>
        <Dropdown.Action
          onClick={ () => {} }
          icon={ Assignment }
          className='pl-2'
        >
          Termos e condições
        </Dropdown.Action>
        <Dropdown.Action
          onClick={ () => {
            dispatch(userSelectEntity(null))
            history.push(ROUTES.PROFILES.URL)
          } }
          icon={ SupervisorAccount }
          className='pl-2'
        >
          Trocar de perfil
        </Dropdown.Action>
        <Dropdown.Action
          onClick={ () => {
            dispatch(userLogout())
            history.push(ROUTES.LOGIN.URL)
          } }
          icon={ ExitToApp }
          className='pl-2 exit'
        >
          Sair
        </Dropdown.Action>
      </Dropdown>
    </header>
  )
}

export default Header
