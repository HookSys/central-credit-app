import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import SvgImage from 'components/SvgImage'
import Dropdown from 'components/Dropdown'
import { useEntity, useStructure } from 'hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getFirstLetters } from 'helpers'

import { EEntityKeys } from 'constants/entity'
import { userLogout, userSelectEntity } from 'core/actions/user'

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

  const entities = useEntity()
  const structure = useStructure()
  const defaultStructure = entities[EEntityKeys.DEFAULT].entity

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.get('data'))
  const entity = user.getSelectedEntity()

  const userFullName = user.get('fullName')
  const { pages } = defaultStructure
  const { small } = structure
  return (
    <header>
      <div className='navbar navbar-dark bg-secondary navbar-xl-light bg-xl-white fixed-top shadow-md'>
        <div className='row w-100 no-gutters'>
          <div className='col-12'>
            { /* Mobile Navbar */ }
            <div className='d-flex d-xl-none w-100 align-items-center'>
              { /* Mobile Left Navbar */ }
              <div className='d-flex text-white mr-auto'>
                <button className='navbar-toggler p-0 border-0 text-white' type='button'>
                  <Menu className='font-size-3xl' onClick={ () => toggleSideNavigation(!isSideNavigationVisible) } />
                </button>
                <div
                  className={ classNames('navbar-small-logo ml-2', small.className, {
                    'is-hided': isSideNavigationVisible,
                  }) }
                >
                  <SvgImage icon={ small.svg } isOverflowHideen={ true } />
                </div>
              </div>
              { /* Mobile Right Navbar */ }
              <div className='d-flex text-white ml-auto mr-2'>
                <div className='border-left border-white px-2'>
                  <Search className='font-size-3xl' />
                </div>
                <div
                  role='presentation'
                  className='border-left border-white pl-2'
                  onClick={ (ev) => dropdown.current.show(ev) }
                >
                  <AccountCircle
                    className='font-size-3xl'
                  />
                </div>
              </div>
            </div>

            { /* Desktop Navbar */ }
            <div className='d-none d-xl-flex w-100 align-items-center'>
              { /* Desktop Left Navbar */ }
              <div className='d-flex text-dark mr-auto ml-3'>
                <div id='search-form-render' />
              </div>
              { /* Desktop Right Navbar */ }
              <div className='d-flex text-dark ml-auto mr-2'>
                <div className='d-flex flex-row-reverse'>
                  <div
                    role='presentation'
                    onClick={ (ev) => dropdown.current.show(ev) }
                    className='d-flex flex-row-reverse font-size-sm border-left border-low-dark navbar-actions'
                  >
                    <div className='d-flex align-items-center navbar-actions-arrow'>
                      <KeyboardArrowDown className='text-low-dark' />
                    </div>
                    <div className='navbar-user-avatar'>
                      <h6 className='text-primary p-0 m-0'>
                        { getFirstLetters(user.get('nome'), user.get('sobrenome')) }
                      </h6>
                    </div>
                    <div className='d-flex flex-column justify-content-center text-right mr-3 pl-3'>
                      <span className='d-block font-weight-bold small-line-height'>
                        { userFullName }
                      </span>
                      <span className='d-block small-line-height mt-1'>
                        { entity.get('entidade_nome') }
                      </span>
                    </div>
                  </div>
                  <div
                    className='d-flex align-items-center justify-content-center border-left border-low-dark px-3 font-size-sm navbar-notifications'
                  >
                    <Notifications className='text-low-dark' />
                  </div>
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
              { userFullName }
            </span>
            <span className='d-block opacity-05 small-line-height'>
              { structure.name }
            </span>
          </div>
        </Dropdown.Header>
        <Dropdown.Action
          onClick={ () => {
            const { pages: structurePages } = structure
            dropdown.current.hide()
            history.push(structurePages.MY_ACCOUNT.INDEX)
          } }
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
        { user.get('funcoes').size > 1 && (
          <Dropdown.Action
            onClick={ () => {
              dispatch(userSelectEntity(null))
              history.push(pages.PROFILES)
            } }
            icon={ SupervisorAccount }
            className='pl-2'
          >
            Trocar de perfil
          </Dropdown.Action>
        ) }
        <Dropdown.Action
          onClick={ () => {
            dispatch(userLogout())
            history.push(pages.LOGIN)
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
