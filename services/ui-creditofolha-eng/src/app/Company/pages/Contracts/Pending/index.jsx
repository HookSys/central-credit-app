import React, { Fragment, useEffect, useCallback, useState } from 'react'
import moment from 'moment'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, Container } from 'templates/PageTemplate'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import { Table, TableHead, TableHeader } from 'components/Table'
import { contractsAsyncRequest, contractsResetResults,
  contractsChangeSelectAll, contractsChangeSelected,
  contractsUpdatePage } from 'company/actions/contracts'
import { pendingAverbationQuery } from 'company/queries/contracts'
import Pagination from 'components/Pagination'
import ContractDetailModal from 'company/components/ContractDetailModal'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'

import ContractsPendingList from './ContractsList'

const ConfirmModal = CreateGenericConfirmModal({
  title: 'Aprovar averbação',
  confirmBtnClassName: 'btn-primary',
  confirmBtnLabel: 'Aprovar',
  cancelOnClose: true,
})

const DenyModal = CreateGenericConfirmModal({
  title: 'Negar averbação',
  confirmBtnClassName: 'btn-danger',
  confirmBtnLabel: 'Negar',
  cancelOnClose: true,
})

const CONFIRM_MODAL = 'confirm_modal'
const DENY_MODAL = 'deny_modal'

const ContractsPending = () => {
  const dispatch = useDispatch()
  const [modalOpened, changeModalOpened] = useState(null)
  const [contractToDetail, changeContractToDetail] = useState(null)
  const selected = useSelector(({ company }) => company.contracts.get('selected'))
  const isAllSelected = useSelector(({ company }) => company.contracts.isAllSelected())
  const options = useSelector(({ company }) => company.contracts.get('options'))
  const pages = useSelector(({ company }) => company.contracts.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestContractsList = useCallback(() => {
    dispatch(contractsAsyncRequest(pendingAverbationQuery, {
      data_solicitacao_depois_de: moment().subtract(2, 'months').format('YYYY-MM-DD'),
      data_solicitacao_antes_de: moment().format('YYYY-MM-DD'),
      status: 'ativo,cancelado',
      status_averbacao: 'aguardando,expirado',
      ordering: '-status_averbacao',
    }))
  }, [])

  useEffect(() => () => {
    dispatch(contractsResetResults())
  }, [])

  useEffect(() => {
    requestContractsList()
  }, [selectedPage])

  const onPageChange = useCallback((page) => async () => {
    dispatch(contractsUpdatePage(page))
  }, [])

  const onDetailsClick = useCallback((contract) => () => {
    changeContractToDetail(contract)
  }, [])

  const onSelectAllChange = useCallback(() => {
    dispatch(contractsChangeSelectAll(!isAllSelected))
  }, [isAllSelected])

  const onSelectedChange = useCallback((contract, isSelected) => () => {
    dispatch(contractsChangeSelected(contract, isSelected))
  }, [])

  const onCloseContractDetail = useCallback(() => {
    changeContractToDetail(null)
  }, [])

  const onDenyContractClick = useCallback(() => {
    changeModalOpened(DENY_MODAL)
  }, [])

  const onConfirmContractClick = useCallback(() => {
    changeModalOpened(CONFIRM_MODAL)
  }, [])

  const onCloseModal = useCallback(() => {
    changeModalOpened(null)
  }, [])

  const onApproveContracts = useCallback(() => {
  }, [selected])

  const onDenyContracts = useCallback(() => {
  }, [selected])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Contratos pendentes de averbação</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button
            className='btn btn-default mr-3'
            disabled={ selected.size === 0 }
            onClick={ onDenyContractClick }
          >
            Negar
          </Button>
          <Button
            disabled={ selected.size === 0 }
            onClick={ onConfirmContractClick }
          >
            Averbar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container className='p-0'>
        <Table className='min-width-lg-only mt-4 mt-lg-0'>
          <TableHead className='d-none d-lg-table-row'>
            <TableHeader width={ 30 }>
              <Checkbox
                id='selectall'
                name='selectall'
                checked={ isAllSelected }
                onChange={ onSelectAllChange }
              />
            </TableHeader>
            <TableHeader>
              Tipo
            </TableHeader>
            <TableHeader>
              Nome
            </TableHeader>
            <TableHeader>
              Matrícula
            </TableHeader>
            <TableHeader>
              Parcela
            </TableHeader>
            <TableHeader>
              Comprometido <br />atual
            </TableHeader>
            <TableHeader>
              Comprometido <br />após averbação
            </TableHeader>
            <TableHeader>
              Averbar até
            </TableHeader>
            <TableHeader width={ 40 } />
          </TableHead>
          <ContractsPendingList
            onDetailsClick={ onDetailsClick }
            onSelectedChange={ onSelectedChange }
          />
        </Table>
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={ pages }
            selectedPage={ selectedPage }
            onChange={ onPageChange }
          />
        </ColumnLeft>
      </ColumnWrapper>
      <ContractDetailModal
        isOpen={ contractToDetail !== null }
        onClose={ onCloseContractDetail }
        contract={ contractToDetail }
      />
      <ConfirmModal
        onConfirm={ onApproveContracts }
        onCancel={ onCloseModal }
        isOpen={ modalOpened === CONFIRM_MODAL }
      >
        Deseja aprovar a averbação dos itens selecionados?
      </ConfirmModal>
      <DenyModal
        onConfirm={ onDenyContracts }
        onCancel={ onCloseModal }
        isOpen={ modalOpened === DENY_MODAL }
      >
        Deseja negar a averbação dos itens selecionados?
      </DenyModal>
    </Fragment>
  )
}

export default React.memo(ContractsPending)
