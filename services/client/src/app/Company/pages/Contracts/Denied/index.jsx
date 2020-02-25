import React, { Fragment, useEffect, useCallback } from 'react'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableHeader } from 'components/Table'
import { contractsAsyncRequest, contractsResetResults,
  contractsUpdatePage } from 'company/actions/contracts'
import { deniedAverbationQuery } from 'company/queries/contracts'
import Pagination from 'components/Pagination'

import ContractsDeniedList from './ContractsList'

const ContractsDenied = () => {
  const dispatch = useDispatch()
  const options = useSelector(({ company }) => company.contracts.get('options'))
  const pages = useSelector(({ company }) => company.contracts.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestContractsList = useCallback(() => {
    dispatch(contractsAsyncRequest(deniedAverbationQuery, {
      status_averbacao: 'negada',
      ordering: '-data_solicitacao',
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

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Contratos com averbação negada</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container className='p-0'>
        <Table className='min-width-lg-only mt-4 mt-lg-0'>
          <TableHead className='d-none d-lg-table-row'>
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
              Comprometido
            </TableHeader>
            <TableHeader>
              Comprometido após averbação
            </TableHeader>
          </TableHead>
          <ContractsDeniedList />
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
    </Fragment>
  )
}

export default React.memo(ContractsDenied)
