import React, { Fragment, useEffect, useContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { usersAsyncRequest, userAsyncRequest, userResetSelected, userDeleteRequest } from 'admin/actions/users'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from 'components/Table'
import UserInfo from 'components/UserInfo'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'

import UserViewSidePanel from './SidePanel'

const ConfirmDeleteModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true
})

const UsersView = ({ profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)
  const { userId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(({ admin }) => admin.users.getIn(['options', 'selected']))
  const users = useSelector(({ admin }) => admin.users.get('results'))

  const userNotFound = () => {
    showErrorToast({
      message: 'Usuário não encontrado!'
    })
    history.push(pages.USERS.INDEX)
  }

  useEffect(() => () => dispatch(userResetSelected()), [])

  useEffect(() => {
    if (!userId) {
      userNotFound()
    } else {
      dispatch(userAsyncRequest(userId)).then((response) => {
        if (!response) {
          userNotFound()
        } else if (users.size === 0) {
          dispatch(usersAsyncRequest())
        }
      })
    }
  }, [userId])

  const onDeleteConfirm = useCallback(async () => {
    toggleDeleteModal(false)
    const response = await dispatch(userDeleteRequest(user.get('id')))
    if (response) {
      showSuccessToast({
        message: 'Usuário removido com sucesso!'
      })
      await dispatch(usersAsyncRequest(true))
      history.push(pages.USERS.INDEX)
    } else {
      showErrorToast({
        message: 'Ocorreu um problema, tente novamente mais tarde'
      })
    }
  }, [user, userId])

  const onDeleteClose = useCallback(() => {
    toggleDeleteModal(false)
  }, [])

  const onUserDeleteClick = useCallback(() => {
    toggleDeleteModal(true)
  }, [user])

  const onUserEditClick = useCallback(() => {
    const route = bindPathParams({
      userId: user.get('id')
    }, pages.USERS.EDIT)
    history.push(route)
  }, [user])

  if (!user) {
    return null
  }

  const fullname = user.getFullName()
  const isAdmin = user.get('isSuperAdmin')
  const profiles = user.get('profiles')

  return (
    <Fragment>
      <UserViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            { isAdmin && (
              <div
                className={classNames('ml-3 px-3 py-1 text-white text-center rounded bg-success')}
              >
                Administrador
              </div>
            )}
          </div>
        </ColumnLeft>
      </ColumnWrapper>

      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='text-low-dark'
            fullName={fullname}
          >
            { `CPF: ${user.get('cpf')}` }
          </UserInfo>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button type='button' className='btn btn-link' onClick={onUserDeleteClick}>
            Remover
          </Button>
          <Button type='button' className='btn btn-default' onClick={onUserEditClick}>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Informações Pessoais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-50' label='Nome' value={fullname} />
            <ViewTableCell className='w-md-50' label='É Admin?' value={isAdmin ? 'Sim' : 'Não'} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='CPF' value={user.get('cpf')} />
            <ViewTableCell className='w-md-75' label='E-mail' value={user.get('email')} />
          </ViewTableRow>
        </ViewTable>
      </Container>
      <Container className='p-0 mt-3'>
        <Table className='min-width-lg-only mt-4 mt-lg-0'>
          <TableHead className='d-none d-lg-table-row'>
            <TableHeader width='100px'>Empresa</TableHeader>
            <TableHeader>Código</TableHeader>
          </TableHead>
          <TableBody>
            {profiles.map((p) => {
              return (
                <TableRow key={p.get('id')}>
                  <TableCell className='text-primary font-weight-bold'>{p.get('name')}</TableCell>
                  <TableCell>{p.get('company')}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Container>
      <ConfirmDeleteModal
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteClose}
        isOpen={isDeleteModalOpen}
      >
        <span>
          Deseja remover <strong>{ `${fullname}` }</strong>?
        </span>
      </ConfirmDeleteModal>
    </Fragment>
  )
}

UsersView.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(UsersView)
