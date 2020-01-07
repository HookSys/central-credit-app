import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useEntity, useStructure } from 'hooks'
import Dropdown, { DropdownAction, DropdownHeader } from 'components/Dropdown'
import { userLogout, userSelectEntity } from 'core/actions/user'
import { useDispatch } from 'react-redux'

import { EEntityKeys } from 'constants/entity'

import {
  AccountBox,
  Assignment,
  SupervisorAccount,
  ExitToApp,
} from '@material-ui/icons'

const Menu = ({ dropdownRef, user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const entities = useEntity()
  const structure = useStructure()
  const defaultStructure = entities[EEntityKeys.DEFAULT].entity
  const { pages } = defaultStructure

  const userFullName = user.get('fullName')

  const onMyAccountAction = useCallback(() => {
    const { pages: structurePages } = structure
    dropdownRef.current.hide()
    history.push(structurePages.MY_ACCOUNT.INDEX)
  }, [structure])

  const onTermsAction = useCallback(() => {
    const { pages: structurePages } = structure
    dropdownRef.current.hide()
    history.push(structurePages.MY_ACCOUNT.INDEX)
  }, [structure])

  const onChangeProfileAction = useCallback(() => {
    dispatch(userSelectEntity(null))
    history.push(pages.PROFILES)
  }, [dispatch])

  const onLogoutAction = useCallback(() => {
    dispatch(userLogout())
    history.push(pages.LOGIN)
  }, [dispatch])

  return (
    <Dropdown ref={ dropdownRef }>
      <DropdownHeader className='flex-column pl-5'>
        <div className='pl-2'>
          <span className='d-block'>
            { userFullName }
          </span>
          <span className='d-block opacity-05 small-line-height'>
            { structure.name }
          </span>
        </div>
      </DropdownHeader>
      <DropdownAction
        onClick={ onMyAccountAction }
        icon={ AccountBox }
        className='pl-2'
      >
        Minha Conta
      </DropdownAction>
      <DropdownAction
        onClick={ onTermsAction }
        icon={ Assignment }
        className='pl-2'
      >
        Termos e condições
      </DropdownAction>
      { user.get('funcoes').size > 1 && (
        <DropdownAction
          onClick={ onChangeProfileAction }
          icon={ SupervisorAccount }
          className='pl-2'
        >
          Trocar de perfil
        </DropdownAction>
      ) }
      <DropdownAction
        onClick={ onLogoutAction }
        icon={ ExitToApp }
        className='pl-2 exit'
      >
        Sair
      </DropdownAction>
    </Dropdown>
  )
}

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  dropdownRef: PropTypes.object.isRequired,
}

export default React.memo(Menu)
